import "reflect-metadata";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolvers";

async function main() {
	const schema = await buildSchema({
		resolvers: [UserResolver],
		emitSchemaFile: true,
	});

	const app = express();
	app.use(
		"/graphql",
		graphqlHTTP({
			schema: schema,
			graphiql: true,
		})
	);

	app.listen(8000, () => console.log(`Express graphql running on port 8000`));
}

main();
