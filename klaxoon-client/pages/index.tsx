import { useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import {
  AddBookmarkDocument,
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  GetAllBookmarkDocument,
  GetAllBookmarkQuery,
  RemoveBookmarkDocument,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
} from "../generated/graphql";
import Input from "../components/Input";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading, refetch } = useQuery<GetAllBookmarkQuery>(
    GetAllBookmarkDocument,
    { variables: { page } }
  );

  const [addBookmark] = useMutation<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >(AddBookmarkDocument, {
    onCompleted: () => {
      refetch();
    },
  });

  const [removeBookmark] = useMutation<
    RemoveBookmarkMutation,
    RemoveBookmarkMutationVariables
  >(RemoveBookmarkDocument, {
    onCompleted: () => {
      refetch();
    },
  });

  const formik = useFormik({
    validationSchema: Yup.object({ url: Yup.string().url().required() }),
    initialValues: { url: "" },
    onSubmit: async (values) => {
      await addBookmark({ variables: values });
      formik.setSubmitting(false);
    },
  });

  return (
    <>
      <Head>
        <title>Bookmark</title>
        <meta name="description" content="Bookmark" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-auto w-1/2 mt-5">
        <form onSubmit={formik.handleSubmit} className="flex w-full">
          <Input
            name="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.errors.url}
            className="flex-1"
          />
          <button
            disabled={!formik.isValid || formik.isSubmitting}
            type="submit"
            className="ml-3 p-3 bg-gray-400"
          >
            Add bookmark
          </button>
        </form>
        {loading && <div>Loading...</div>}
        {!loading && data && (
          <>
            <ul className="mt-5">
              {data.getAllBookmark.map(
                ({ _id, title, url, autor, createdAt }) => {
                  return (
                    <li key={_id} className="flex flex-row">
                      <div className="flex-1 p-2">{url}</div>
                      <div className="flex-1 p-2">{title}</div>
                      <div className=" p-2">{autor}</div>
                      <div className=" p-2">{createdAt}</div>
                      <div>
                        <Link href={`/${_id}`}>
                          <a className="ml-3 bg-gray-400">edit</a>
                        </Link>{" "}
                        <button
                          className="ml-3 bg-gray-400"
                          onClick={() => removeBookmark({ variables: { _id } })}
                        >
                          delete
                        </button>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
            <ul>
              {Array.from(
                new Array(Math.ceil(data.countBookmark / 10)).keys()
              ).map((p, i) => {
                const pageIndex = p + 1;
                return (
                  <button
                    className={`border mr-1 ${
                      page === pageIndex && "border-gray-700"
                    }`}
                    key={p}
                    onClick={() => setPage(pageIndex)}
                  >
                    {pageIndex}
                  </button>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
