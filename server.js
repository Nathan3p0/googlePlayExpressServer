const { app, port } = require('./index.js');

app.listen(8000, () => {
    console.log(`Server is listening on Port ${port}`);
})
