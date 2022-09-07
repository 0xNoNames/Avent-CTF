const auth = (req, res, next) => {
  const auth = {
    login: 'ptdr',
    password: 'H3S#&y6MiqX0'
  }

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (login && password && password === auth.password) return next();

  res.set('WWW-Authenticate', 'Basic realm="Access to upload files"')
  res.status(401).send('Authentication required.')
}

export default auth;
