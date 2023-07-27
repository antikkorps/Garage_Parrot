import prisma from '../../../lib/prisma';

export default async function Annonces() {
  const feed = await prisma.annonce.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  const renderedFeed = Array.from(feed, (annonce) => (
    <div key={annonce.id}>
      <h2>{annonce.title}</h2>
      <p>{annonce.content}</p>
      <p>Par: {annonce.author.name}</p>
    </div>
  ));

  return {
    feed: renderedFeed,
  };
}
