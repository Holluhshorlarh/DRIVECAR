const app = require("./app");

app.get("/", (req, res) => {
    res.write("Hello world")
    res.end()
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})