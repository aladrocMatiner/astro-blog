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

type PostContent = PostFrontmatter & {
  slug: string;
  Content: any;
};

type Post = PostContent;
type Draft = PostContent;

function loadPosts(glob: Record<string, PostModule>, basePath: string): PostContent[] {
  return Object.entries(glob)
    .map(([filePath, module]) => {
      const slug = filePath.replace(basePath, '').replace('.md', '');
      return {
        slug,
        Content: module.default,
        ...module.frontmatter
      };
    })
    .sort((a, b) => new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf());
}

const posts = loadPosts(
  import.meta.glob('../content/posts/*.md', { eager: true }) as Record<string, PostModule>,
  '../content/posts/'
);

const drafts = loadPosts(
  import.meta.glob('../content/drafts/*.md', { eager: true }) as Record<string, PostModule>,
  '../content/drafts/'
);

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllDrafts(): Draft[] {
  return drafts;
}

export function getDraftBySlug(slug: string): Draft | undefined {
  return drafts.find((draft) => draft.slug === slug);
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
