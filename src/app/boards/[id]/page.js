import BoardView from '../../../components/BoardView';

export default async function BoardPage({ params }) {
  const { id } = await params;

  if (!id || id === 'undefined') {
    return <div>Invalid board ID</div>;
  }

  return <BoardView boardId={id} />;
}
