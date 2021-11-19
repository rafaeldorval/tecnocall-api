module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(400).json({
    error: "invalid_client",
    error_description: "Invalid client authentication"
  })

  const parts = authHeader.split(' ')
  const [scheme, token] = parts

  if ((!parts.length === 2) || (!/^Basic$/i.test(scheme))) return res.status(401).json({
    error: "invalid_request",
    error_description: "Invalid token"
  })

  const corretToken = 'ZmVuaXg6QkIwNzBGNDE2OTIzRUNENEZFMTkxMjA4N0YwOTc2MDlENkI0RTZDREIyODM1NTY1NEEzQkNFMUE4QjMwNENEMw=='

  if(token !== corretToken) {
    return res.status(400).json({
      error: "invalid_client",
      error_description: "Invalid client authentication"
    })
  }

  next()
}