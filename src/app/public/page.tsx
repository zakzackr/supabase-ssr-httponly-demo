/**
 * Public page component accessible to all users
 * No authentication required to view this content
 */
export default function PublicPage() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Public Page</h1>
            <div className="p-6 border rounded-lg bg-gray-50">
                <p className="text-lg">
                    This page is accessible to everyone, whether you are logged
                    in or not.
                </p>
                <p className="mt-2">
                    This is an example of content that you would want to make
                    public, such as a company landing page, blog posts, or
                    product information.
                </p>
            </div>
        </main>
    );
}
