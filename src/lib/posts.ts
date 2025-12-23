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
