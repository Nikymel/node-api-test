# Node JS API Test
Repository for a Node JS API test application, currently hosted on `node-api-nik.herokuapp.com`.

## API Calls
- `node-api-nik.herokuapp.com/api/users`: GETs list of all users.
- `node-api-nik.herokuapp.com/api/users`: POSTs a user, requires:
    - `username`, `name` and `age`
- `node-api-nik.herokuapp.com/api/users/:username`: GETs requested user.