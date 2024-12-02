import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useGetPagesQuery } from "../../../store/apis/endpoints/pageSetup";

function PageSelector({ value, onChange, className }) {
  const { data: pagesData } = useGetPagesQuery();

  const pages =
    pagesData?.data?.pages?.map((page) => ({
      label: page.nameEn,
      value: page.id,
      description: page.slug,
    })) || [];

  return (
    <Autocomplete
      label="Link to Page"
      placeholder="Search for a page"
      defaultItems={pages}
      selectedKey={value}
      onSelectionChange={onChange}
      className={className}
    >
      {(item) => (
        <AutocompleteItem key={item.value} textValue={item.label}>
          <div className="flex flex-col">
            <span>{item.label}</span>
            <span className="text-small text-default-400">
              {item.description}
            </span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default PageSelector;
