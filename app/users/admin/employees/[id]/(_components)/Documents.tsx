import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: string;
  Documents: string[];
};

export default function Documents() {
  const params = useParams();
  const [userData, setUserData] = useState<User[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);


  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [params.id]);

  useEffect(() => {
    if (userData.length > 0) {
      const documentLinks = userData.map((i) => i.Documents).flat();
      const fetchImages = async () => {
        const imageResponses = await Promise.all(
          documentLinks.map((link) => fetch(link).then((res) => res.blob()))
        );
        const imageUrls = imageResponses.map((blob) =>
          URL.createObjectURL(blob)
        );
        setImageUrls(imageUrls);
      };

      fetchImages();
    }
  }, [userData]);

  return (
    <div>
      {imageUrls.length > 0 ? (
        imageUrls.map((url, index) => (
          <div key={index} className="grid grid-cols-2 gap-x-8">
            {url ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-xl text-white">
                    Open Document/Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%]">
                  <Image
                    src={url}
                    alt="image"
                    width={1000}
                    height={1000}
                    style={{ margin: "auto" }}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <p>No documents</p> 
            )}
          </div>
        ))
      ) : (
        <p className="text-center mt-12 text-xl font-medium">No documents available</p> 
      )}
    </div>
  );
}
