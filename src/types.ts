export interface TreeNode {
	name: string;
	path: string;
	isDir: boolean;
	children?: TreeNode[];
}
