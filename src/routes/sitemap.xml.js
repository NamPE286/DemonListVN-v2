import fs from 'fs';

export async function GET() {
	try {
		const data = fs.readFileSync('sitemap.xml', 'utf8');

		return {
			headers: {
				'Content-Type': 'application/xml'
			},
			body: data
		};
	} catch (e) {
        console.log(e)
		return {
			body: 'Error'
		};
	}
}