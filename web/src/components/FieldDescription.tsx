export function FieldDescription({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <>
      <h4 className='font-medium leading-7 text-gray-900'>{title}</h4>
      {description && (
        <p className='mb-2 text-xs text-gray-400'>{description}</p>
      )}
    </>
  )
}
