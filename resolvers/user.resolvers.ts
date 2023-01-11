import { Field, Query, Resolver, Arg, Mutation } from "type-graphql";
import { UserInput, User } from "../schema/users.schema";

@Resolver(() => User)
export class UserResolver {
	private users: User[] = [
		{ id: 1, name: "John Doe", email: "johndoe@gmail.com" },
		{ id: 2, name: "Jane Doe", email: "janedoe@gmail.com" },
		{ id: 3, name: "Mike Doe", email: "mikedoe@gmail.com" },
	];
	// get all users
	@Query(() => [User])
	async getUsers(): Promise<User[]> {
		return this.users;
	}
	// find a user
	@Query(() => User)
	async getUser(@Arg("id") id: number): Promise<User | undefined> {
		const user = this.users.find((u) => u.id == id);
		return user;
	}
	// create user
	@Mutation(() => User)
	async createUser(@Arg("input") input: UserInput): Promise<User> {
		const user = {
			id: this.users.length + 1,
			...input,
		};
		this.users.push(user);
		return user;
	}
	// update user
	@Mutation(() => User)
	async updateUser(
		@Arg("id") id: number,
		@Arg("input") input: UserInput
	): Promise<User> {
		const user = this.users.find((u) => u.id == id);
		if (!user) {
			throw new Error("User not found");
		}
		const updateUser = {
			...user,
			...input,
		};
		this.users = this.users.map((u) => (u.id === id ? updateUser : u));
		return updateUser;
	}
}
