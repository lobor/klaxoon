import { useMutation, useQuery } from "@apollo/client";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import Input from "../components/Input";
import {
  Bookmark,
  GetAllBookmarkDocument,
  GetAllBookmarkQuery,
  GetBookmarkByIdDocument,
  GetBookmarkByIdQuery,
  GetBookmarkByIdQueryVariables,
  UpdateKeywordsBookmarkDocument,
  UpdateKeywordsBookmarkMutation,
  UpdateKeywordsBookmarkMutationVariables,
} from "../generated/graphql";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery<
    GetBookmarkByIdQuery,
    GetBookmarkByIdQueryVariables
  >(GetBookmarkByIdDocument, { variables: { _id: id as string }, skip: !id });

  const [updateKeywords] = useMutation<
    UpdateKeywordsBookmarkMutation,
    UpdateKeywordsBookmarkMutationVariables
  >(UpdateKeywordsBookmarkDocument);

  const formik = useFormik({
    initialValues: { keywords: (data && data.getBookmarkById.keywords) || [] },
    enableReinitialize: true,
    onSubmit: ({ keywords }) => {
      updateKeywords({ variables: { keywords, _id: id as string } });
    },
  });
  return (
    <>
      <Head>
        <title>Bookmark</title>
        <meta name="description" content="Bookmark" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!id && <div>404 not found</div>}
      {loading && <div>Loading...</div>}
      {!loading && data && (
        <FormikProvider value={formik}>
          <h1>Add, modify, delete keywords of {data.getBookmarkById.title}</h1>
          <form onSubmit={formik.handleSubmit} className="m-auto w-1/2 mt-5">
            <FieldArray
              name="keywords"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.keywords.map((friend, index) => (
                    <div key={index} className="flex">
                      {/** both these conventions do the same  */}
                      <Input
                        name={`keywords[${index}]`}
                        value={formik.values.keywords[index]}
                        onChange={formik.handleChange}
                      />

                      <button
                        type="button"
                        className="border p-5"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    className="border p-5"
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                  >
                    +
                  </button>
                </div>
              )}
            />
            <div>
              <Link href="/">
                <a className="border border-gray-700">cancel</a>
              </Link>
              <button className="border border-gray-700" type="submit">
                Save
              </button>
            </div>
          </form>
        </FormikProvider>
      )}
    </>
  );
}
