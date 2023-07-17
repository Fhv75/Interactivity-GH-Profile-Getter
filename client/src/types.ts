export interface UserData {
	name: string;
	login: string;
	avatar_url: string;
	bio: string;
	public_repos: number;
	created_at: string;
	location: string;
	html_url: string;
}

export interface RepoData {
	name: string;
	description: string;
	language: string;
	color: string;
	url: string;
}