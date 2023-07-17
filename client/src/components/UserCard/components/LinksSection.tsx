import { HStack, Text } from "@chakra-ui/react";

interface Props {
	url: string;
	login: string;
}

export default function LinksSection({ data }: { data: Props }) {
	return (
		<>
			<HStack>
				<Text>Visit them at:</Text>
				<Text
					color="purple.600"
					as="a"
					rel="noopener noreferrer"
					target="_blank"
					href={data.url}
				>{`@${data.login}`}</Text>
			</HStack>
			<HStack>
				<Text>Check all their repos:</Text>
				<Text
					color="purple.600"
					as="a"
					rel="noopener noreferrer"
					target="_blank"
					href={data.url && data.url + "?tab=repositories"}
				>{`@${data.login}/repos`}</Text>
			</HStack>
		</>
	);
}
