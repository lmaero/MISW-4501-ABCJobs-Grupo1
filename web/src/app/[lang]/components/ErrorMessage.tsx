export function ErrorMessage({ message }: { message: string | undefined }) {
  if (message) return <p className='text-sm text-red-700'>{message}</p>
}
