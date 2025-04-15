const routes = {
  home: '/',
  authorization: '/authorization',
  desks: '/desks',
  'desks/id': (id: string) => `/desks${id}`,
  registration: '/registration',
  logout: '/logout',
};

export default routes;
