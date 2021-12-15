import Link from 'next/link'

const LinkItem = ({ href, children, ...props }) => {
  return (
    <Link href={href} {...props}>
      <div style={{cursor: 'pointer'}} {...props} className="lg:inline-flex color-text lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:bg-purple-400 hover:text-white">
        <a>{children}</a>
      </div>
    </Link>
  )
}

export default LinkItem