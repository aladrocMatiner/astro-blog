type PostFrontmatter = {
  title: string;
  summary: string;
  publishDate: string;
  tags: string[];
};

type PostModule = {
  frontmatter: PostFrontmatter;
  default: any;
};

type Post = PostFrontmatter & {
  slug: string;
  Content: any;
};

const postModules = Object.entries(
  import.meta.glob('../content/posts/*.md', { eager: true })
) as [string, PostModule][];

const posts = postModules
  .map(([filePath, module]) => {
    const slug = filePath.replace('../content/posts/', '').replace('.md', '');
    return {
      slug,
      Content: module.default,
      ...module.frontmatter
    };
  })
  .sort((a, b) => new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf());

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

type TagSummary = {
  tag: string;
  posts: Post[];
};

export function getTags(): TagSummary[] {
  type Bucket = { label: string; posts: Post[] };
  const buckets = new Map<string, Bucket>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const normalized = tag.toLowerCase();
      const bucket = buckets.get(normalized);
      if (!bucket) {
        buckets.set(normalized, { label: tag, posts: [post] });
      } else {
        bucket.posts.push(post);
      }
    });
  });

  return Array.from(buckets.values())
    .map(({ label, posts: postsForTag }) => ({
      tag: label,
      posts: postsForTag
    }))
    .sort((a, b) => b.posts.length - a.posts.length);
}

export function getPostsByTag(tag: string): Post[] {
  const normalized = tag.toLowerCase();
  return posts.filter((post) => post.tags.some((current) => current.toLowerCase() === normalized));
}
