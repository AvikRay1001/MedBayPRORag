"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Database, LucideLoader2, MoveUp, RefreshCcw } from "lucide-react";
import { useState } from "react";


const VectorDBPage = () => {
  const [isuploading, setisuploading] = useState(false);
  const [indexname, setindexname] = useState("");
  const [namespace, setnamespace] = useState("")
  const onStartUpload = async() => {
    const response = await fetch('api/updateddatabase', {method: 'POST', body: JSON.stringify({indexname, namespace})});
    console.log(response);

    // await processStreamedProgress(response);
  }

  return (
    <main className="flex flex-col items-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>Update Knowledge Base</CardTitle>
          <CardDescription>Add new documents to your vector DB</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-4 border rounded-lg p-6">
              <div className="gap-4 relative">
                <Button
                  className="absolute -right-4 -top-4"
                  variant={"ghost"}
                  size={"icon"}
                >
                  <RefreshCcw />
                </Button>
                <Label className="mb-2 font-semibold">Files List</Label>
                <Textarea
                  readOnly
                  className="min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="font-semibold">Index Name</Label>
                  <Input value={indexname} onChange={e => setindexname(e.target.value)} placeholder="index name" disabled={isuploading} className="disabled:cursor-default"/>
                </div>
                <div className="grid gap-2">
                  <Label className="font-semibold">Namespace</Label>
                  <Input value={namespace} onChange={e => setnamespace(e.target.value)} placeholder="namespace" disabled={isuploading} className="disabled:cursor-default"/>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full h-full flex items-center justify-center p-0 border-2"
              onClick={onStartUpload}
            >
              <span className="flex flex-row">
                <Database className="!size-12 stroke-[#D90013]" />
                <MoveUp className="stroke-[#D90013] !size-5" />
              </span>
            </Button>
          </div>

          {isuploading && <div className="mt-4">
            <Label className="font-semibold">File Name:</Label>
            <div className="flex flex-row items-center gap-4">
              <Progress value={80}/>
              <LucideLoader2 className="stroke-[#D90013] animate-spin"/>
            </div>
          </div>}
          
        </CardContent>
      </Card>
    </main>
  );
}

export default VectorDBPage