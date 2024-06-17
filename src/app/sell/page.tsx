"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import SelectCategory from "../_components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../_components/Editor";
import { UploadDropzone } from "../_lib/uploadThing";
import { Button } from "@/components/ui/button";
import { JSONContent } from "@tiptap/react";
import { SellProduct, State } from "../actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Submitbutton } from "../_components/SubmitButtons";
import { redirect } from "next/navigation";

const SellPage = () => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [productFile, setProductFile] = useState<string | null>(null);

  // console.log(state?.errors);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name of your Product"
                name="name"
                required
                minLength={3}
              />
              {state?.errors?.["name"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["name"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {state?.errors?.["category"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["category"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="$25"
                name="price"
                required
                min={1}
              />
              {state?.errors?.["price"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["price"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Small summary</Label>
              <Textarea
                placeholder="Please describe your product shortly right here..."
                name="smallDescription"
                required
                minLength={10}
              />
              {state?.errors?.["smallDescription"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["smallDescription"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
                required
                minLength={10}
              />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["description"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success("Image uploaded successfully!");
                }}
                onUploadError={(error: Error) => {
                  toast.error("Image upload failed! Please try again");
                }}
              />
              {state?.errors?.["images"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["images"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <Label>Product File</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success("Product file uploaded successfully!");
                }}
                onUploadError={(error: Error) => {
                  toast.error("Product file upload failed! Please try again");
                }}
              />
              {state?.errors?.["productFile"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["productFile"]?.[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Submitbutton title="Submit form" />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default SellPage;
