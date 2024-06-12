
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono().get("/", async (c) => {
	return c.json({ message: "Hello, World!" })
})

const r = cors({
	origin:	'*',
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.use(r)

app.get("/generate",async(c: any = {}) => {
	const response = await c.env.AI.run("@cf/meta/llama-3-8b-instruct", {
		messages: [
			{"role": "system", "content":"just return code say nothing else"},
			{ "role": "user", "content": "generate 10 line typescript code" }
		]
	})
	return c.json(response)
} )

export default app;