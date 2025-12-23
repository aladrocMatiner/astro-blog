import time
from prometheus_client import Gauge, start_http_server
import docker

CPU_GAUGE = Gauge(
    'astro_container_cpu_percent',
    'CPU usage percentage for containers',
    ['container', 'service']
)
MEM_BYTES_GAUGE = Gauge(
    'astro_container_memory_bytes',
    'Memory usage in bytes for containers',
    ['container', 'service']
)
MEM_PERCENT_GAUGE = Gauge(
    'astro_container_memory_percent',
    'Memory usage percentage for containers',
    ['container', 'service']
)

CLIENT = docker.DockerClient(base_url='unix:///var/run/docker.sock')


def calculate_cpu_percent(stats: dict) -> float:
    cpu_stats = stats.get('cpu_stats', {})
    precpu_stats = stats.get('precpu_stats', {})
    cpu_delta = cpu_stats.get('cpu_usage', {}).get('total_usage', 0) - precpu_stats.get('cpu_usage', {}).get('total_usage', 0)
    system_delta = cpu_stats.get('system_cpu_usage', 0) - precpu_stats.get('system_cpu_usage', 0)
    percpu = cpu_stats.get('cpu_usage', {}).get('percpu_usage')
    online_cpus = cpu_stats.get('online_cpus')
    cpu_count = len(percpu) if percpu else online_cpus or 1
    if system_delta > 0 and cpu_count:
        return (cpu_delta / system_delta) * cpu_count * 100.0
    return 0.0


def fetch_memory_usage(stats):
    memory_stats = stats.get('memory_stats', {})
    usage = memory_stats.get('usage', 0)
    # Drop cache to reflect real usage when available
    stats_cache = memory_stats.get('stats', {}).get('cache', 0)
    effective_usage = max(usage - stats_cache, 0)
    limit = memory_stats.get('limit', 0) or 1
    return effective_usage, limit


def collect_metrics() -> None:
    for container in CLIENT.containers.list():
        try:
            stats = container.stats(stream=False)
        except docker.errors.APIError:
            continue
        service = container.attrs.get('Config', {}).get('Labels', {}).get('com.docker.compose.service', container.name)
        cpu_percent = calculate_cpu_percent(stats)
        mem_usage, mem_limit = fetch_memory_usage(stats)
        mem_percent = (mem_usage / mem_limit) * 100.0 if mem_limit else 0.0
        CPU_GAUGE.labels(container=container.name, service=service).set(cpu_percent)
        MEM_BYTES_GAUGE.labels(container=container.name, service=service).set(mem_usage)
        MEM_PERCENT_GAUGE.labels(container=container.name, service=service).set(mem_percent)


if __name__ == '__main__':
    start_http_server(9800)
    while True:
        collect_metrics()
        time.sleep(5)
