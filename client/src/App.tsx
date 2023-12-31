import { Search2Icon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	HStack,
	Heading,
	Input,
	Spinner,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Header from "./components/Header";
import UserCard from "./components/UserCard/UserCard";
import { UserData } from "./types";

enum RequestState {
	fail,
	success,
	pending,
}

function App() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	const [userData, setUserData] = useState<UserData>({
		name: "",
		login: "",
		avatar_url: "",
		bio: "",
		created_at: "",
		location: "",
		html_url: "",
		public_repos: 0
	});

	const [isLoading, setIsLoading] = useState(false);
	const [successfulRequest, setSuccessfulRequest] = useState<RequestState>(
		RequestState.pending
	);

	async function onSubmit(data: FieldValues) {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`https://api.github.com/users/${data.username}`
			);
			console.log(response);
			setUserData({
				name: response.data.name,
				login: response.data.login,
				avatar_url: response.data.avatar_url,
				bio: response.data.bio,
				created_at: response.data.created_at.split("-")[0],
				location: response.data.location,
				html_url: response.data.html_url,
				public_repos: response.data.public_repos
			});
			setSuccessfulRequest(RequestState.success);
		} catch (err) {
			console.log(err);
			setSuccessfulRequest(RequestState.fail);
		}
		setIsLoading(false);
		reset();
	}

	return (
		<Flex
			width="100vw"
			minHeight="100vh"
			alignContent="center"
			flexDirection="column"
			bg="#fafafa"
		>
			<Header />

			<Center mt={8} flexDirection="column">
				<form onSubmit={handleSubmit(onSubmit)}>
					<HStack>
						<Input
							minW={{ base: "300px", md: "400px" }}
							borderColor="#cccccc"
							bg="white"
							placeholder="Enter a github username"
							{...register("username", { required: true })}
						/>
						<Button colorScheme="purple" type="submit">
							<Search2Icon />
						</Button>
					</HStack>
					{errors.username && (
						<Text mt={2} mx={3} color="purple.600">You can't leave this empty!</Text>
					)}
				</form>

				<Box mt={8} minW="85%">
					<Divider />
				</Box>

				{isLoading ? (
					<Spinner my={40} size="xl" />
				) : successfulRequest == RequestState.success ? (
					<UserCard userData={userData} />
				) : (
					successfulRequest == RequestState.fail && (
						<Heading color="#aaa" mt={20}>
							User Not Found
						</Heading>
					)
				)}
			</Center>
		</Flex>
	);
}

export default App;
