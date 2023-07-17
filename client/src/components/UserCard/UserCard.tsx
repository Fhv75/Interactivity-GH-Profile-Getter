import {
	Avatar,
	Card,
	CardBody,
	Center,
	Divider,
	Flex,
	Grid,
	GridItem,
	HStack,
	Heading,
	SimpleGrid,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { RepoData, UserData } from "../../types";
import LinksSection from "./components/LinksSection";
import RepoCard from "./components/RepoCard";

export default function UserCard({ userData }: { userData: UserData }) {
	const [reposData, setReposData] = useState<RepoData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		(async function getRepos() {
			setIsLoading(true);
			try {
				const response = await axios.get(
					`https://gh-pinned-repos.egoist.dev/?username=${userData.login}`
				);
				const slicedArray = response.data.slice(0, 4);
				console.log(response);
				setReposData(
					slicedArray.map((elem: any) => {
						return {
							name: elem.repo,
							description: elem.description,
							language: elem.language,
							url: elem.link,
							color: elem.languageColor,
						};
					})
				);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		})();
	}, [userData]);

	return (
		<Card
			p={{ base: 2, xl: 10 }}
			my={10}
			mx={{ base: 6, md: 20, lg: 40, xl: 60 }}
			minW={{ base: "460px", md: "590px", xl: "1189px" }}
		>
			<CardBody my={5}>
				<Grid templateColumns="repeat(5, 1fr)" gap={5}>
					<GridItem
						colSpan={{ base: 5, xl: 2 }}
						me={{ base: 0, xl: 20 }}
						mb={{ base: 10, xl: 0 }}
					>
						<Center mb={5}>
							<Avatar
								width="250px"
								height="250px"
								src={userData.avatar_url}
							></Avatar>
						</Center>

						<VStack
							align={{ base: "center", xl: "start" }}
							textAlign={{ base: "center", xl: "start" }}
							ms={5}
						>
							<Heading
								size="lg"
								as="a"
								rel="noopener noreferrer"
								target="_blank"
								_hover={{
									color: "purple.600",
									transitionDuration: "0.5s",
								}}
								transition={"0.5s"}
								href={userData.html_url}
							>
								{userData.name}
							</Heading>
							<Text fontSize="lg" color="#aaa">
								{userData.login}
							</Text>
							<Text fontSize="lg">{userData.bio}</Text>
							<Text
								fontSize="lg"
								color="#aaa"
							>{`Joined on ${userData.created_at}`}</Text>
							{userData.location && (
								<HStack>
									<FaLocationArrow />
									<Text fontSize="lg">
										{userData.location}
									</Text>
								</HStack>
							)}
						</VStack>

						<Divider
							mt={10}
							display={{ base: "block", xl: "none" }}
						/>
					</GridItem>

					<GridItem
						colSpan={{ base: 5, xl: 3 }}
						display="flex"
						flexDirection="column"
					>
						<Text fontWeight="bold" fontSize="md" mb={5}>
							Popular repositories:
						</Text>

						{isLoading ? (
							<Center my="auto">
								<Spinner />
							</Center>
						) : (
							<SimpleGrid
								columns={{
									md: userData.public_repos > 2 ? 2 : 1,
								}}
								spacing={10}
								mb={12}
							>
								{reposData.map((repo, index) => (
									<RepoCard key={index} data={repo} />
								))}
							</SimpleGrid>
						)}
						<Flex
							fontSize="xl"
							mt="auto"
							flexDirection="column"
							alignItems="end"
						>
							<LinksSection
								data={{
									url: userData.html_url,
									login: userData.login,
								}}
							/>
						</Flex>
					</GridItem>
				</Grid>
			</CardBody>
		</Card>
	);
}
