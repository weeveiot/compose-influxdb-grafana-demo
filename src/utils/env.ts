import 'process'

/* If the environment variable is not set, exit the process. */
export default (name: string): string | null => {
  const value = process.env[name]
  if (!value) {
    console.error(`Environment variable missing: ${name}`)
    process.exit(0)
  }
  return value
}
