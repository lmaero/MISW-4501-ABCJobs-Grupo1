interface Props {
  params: { id: string }
}

export default function Page({ params }: Props) {
  return <div>{params.id}</div>
}
