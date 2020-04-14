export function getEnvValue(name, isRequired = true) {
  const value = process.env[name]
  if (!value && isRequired) {
    throw new Error(`${name} is required`)
  }
  return value
}
