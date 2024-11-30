import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useGetPagesByTemplateQuery } from "../../../../store/apis/endpoints/pageSetup";

function SlugInput({ value, onChange, templateType }) {
  const { data } = useGetPagesByTemplateQuery({ template: templateType });

  const items =
    data?.data?.pages?.map((page) => ({
      label: page.nameEn,
      value: page.id,
      description: page.slug,
    })) || [];

  return (
    <Autocomplete
      label="Select Page Slug"
      defaultItems={items}
      placeholder="Search for a page slug"
      selectedKey={value}
      onSelectionChange={onChange}
      className="w-full"
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

export default SlugInput;
