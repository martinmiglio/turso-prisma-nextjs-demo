import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const dbData = await prisma.demo.findMany();

  return (
    <div className="flex w-full max-w-screen-md flex-col gap-2 py-2">
      <form
        action={async (formData: FormData) => {
          "use server";
          const value = formData.get("value")?.toString();
          if (!value || value === "") {
            return;
          }
          await prisma.demo.create({ data: { value } });
          revalidatePath("/");
        }}
        className="inline-flex rounded-md "
      >
        <input
          type="text"
          name="value"
          className="flex-1 rounded-l-md border border-black bg-white p-1 text-black"
          placeholder="Enter a value to save to the db"
        />
        <input
          type="submit"
          value="Submit"
          className="rounded-r-md border border-l-0 border-black bg-white p-1 text-black hover:underline"
        />
      </form>
      <div className="rounded-md border border-black p-1">
        <h1 className="text-center text-xl font-bold">DB Data</h1>
        <table className="w-full table-auto border-collapse">
          <thead className="sticky">
            <tr>
              {Object.keys(Prisma.DemoScalarFieldEnum).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
            {dbData.map((item) => (
              <tr key={item.id}>
                <td className="text-left">{item.id}</td>
                <td className="text-center">{item.createdAt.toString()}</td>
                <td className="text-right">{item.value}</td>
                <td>
                  <form>
                    <button
                      formAction={async () => {
                        "use server";
                        await prisma.demo.delete({ where: { id: item.id } });
                        revalidatePath("/");
                      }}
                      className="ml-4 font-light underline hover:opacity-80"
                    >
                      Remove
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
