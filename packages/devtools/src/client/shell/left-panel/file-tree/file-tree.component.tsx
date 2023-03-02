import {
  FileIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileDirectoryIcon,
  FileDirectoryFillIcon,
} from "@primer/octicons-react";
import { useState } from "react";
import { Button, Stack, Typography } from "../../../theme/theme";
import { createTemplateTree } from "./file-tree.constants";
import {
  FileTreeProps,
  TemplateItem,
  TemplateList as TTemplateList,
  TemplateFolder as TTemplateFolder,
} from "./file-tree.types";
import Router, { useRouter } from "next/router";

const DEPTH_PAD = 16;

const TemplateButton = (
  props: TemplateItem & {
    depth: number;
    onClick: () => void;
    isActive: boolean;
  }
) => {
  return (
    <Button
      css={{
        textAlign: "left",
        fontFamily: "$inter",
        paddingLeft: props.depth * DEPTH_PAD + 14,
        pr: 2,
        backgroundColor: props.isActive ? "$gray3" : "transparent",
      }}
      onClick={props.onClick}
    >
      <Stack
        css={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 8,
        }}
      >
        <FileIcon size={14} />
        <Typography>{props.label}</Typography>
      </Stack>
    </Button>
  );
};

const TemplateFolder = (props: {
  label: string;
  onClick: () => void;
  isExpanded: boolean;
  depth: number;
}) => {
  return (
    <Button
      css={{
        textAlign: "left",
        fontFamily: "$inter",
        paddingLeft: props.depth * DEPTH_PAD + 8,
        pr: 2,
      }}
      onClick={props.onClick}
    >
      <Stack
        css={{
          flexDirection: "row",
          columnGap: 8,
          alignItems: "center",
        }}
      >
        {props.isExpanded ? (
          <ChevronDownIcon size={14} />
        ) : (
          <ChevronRightIcon size={14} />
        )}
        {props.isExpanded ? (
          <FileDirectoryIcon size={14} />
        ) : (
          <FileDirectoryFillIcon size={14} />
        )}
        <Typography>{props.label}</Typography>
      </Stack>
    </Button>
  );
};

const TemplateListItem = (props: {
  item: TTemplateFolder | TemplateItem;
  depth: number;
}) => {
  const { depth, item } = props;
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const path = router.asPath.split("?")[0].replace(/\#.*/, "");

  if (item.type === "item") {
    return (
      <TemplateButton
        {...item}
        depth={depth}
        isActive={path === item.urlPath}
        onClick={() => {
          if (item.urlPath) {
            // TODO: Make framework agnostic
            Router.push(item.urlPath);
          }
        }}
      />
    );
  }

  if (item.type === "folder") {
    return (
      <Stack>
        <TemplateFolder
          label={item.label}
          onClick={() => setIsOpen((x) => !x)}
          isExpanded={isOpen}
          depth={depth}
        />
        {isOpen && <TemplateList list={item.children} depth={depth + 1} />}
      </Stack>
    );
  }

  return <></>;
};

const TemplateList = (props: { list: TTemplateList; depth: number }) => {
  const { list, depth } = props;

  return (
    <Stack>
      {list.map((item, i) => {
        return <TemplateListItem key={i} item={item} depth={depth} />;
      })}
    </Stack>
  );
};

export const FileTree = (props: FileTreeProps) => {
  const templateList = createTemplateTree(props.templates);

  return <TemplateList list={templateList} depth={0} />;
};
