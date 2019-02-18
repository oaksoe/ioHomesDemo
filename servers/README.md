# Node Servers

# Set Environment
# ---------------
# Before running the app, in console,
export NODE_ENV=production

# Or in windows,
SET NODE_ENV=production

# Or run the app
NODE_ENV=production node app.js

# Or set in js file
process.env.NODE_ENV = 'production';

# Note: Express app.get('env') returns 'development' if NODE_ENV is not defined.