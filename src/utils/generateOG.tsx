import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import * as fs from "fs";
import * as React from "react";

// Kyle's brand colors
const colors = {
  magenta: "#b3114b",
  blue: "#0188ac",
  green: "#2db25f",
  orange: "#d65616",
  purple: "#5c4cbf",
  yellow: "#ffc517",
  rose: "#fb7185",
};

interface Author {
  name: string;
}

interface OGImageOptions {
  title: string;
  author?: string | Author | Array<string | Author>;
}

export async function generateOGImage(
  options: OGImageOptions,
): Promise<Buffer> {
  const { title: rawTitle, author } = options;

  // Strip HTML tags from title for OG image display
  const title = rawTitle.replace(/<[^>]*>/g, "");

  // Format author names with oxford comma and "and"
  function combineNames(names: string[]): string {
    if (names.length === 0) {
      return "";
    } else if (names.length === 1) {
      return `${names[0]}`;
    } else if (names.length === 2) {
      return `${names[0]} and ${names[1]}`;
    } else {
      return `${names.slice(0, -1).join(", ")}, and ${names.slice(-1)}`;
    }
  }

  // Format author for display
  let authorText = "";
  if (author) {
    if (Array.isArray(author)) {
      const names = author.map((a) =>
        typeof a === "object" && a !== null && "name" in a ? a.name : String(a),
      );
      authorText = combineNames(names);
    } else {
      authorText =
        typeof author === "object" && author !== null && "name" in author
          ? author.name
          : String(author);
    }
  }

  const jsx = React.createElement(
    "div",
    {
      style: {
        background: "#e4e4e7", // zinc-200
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px",
        fontFamily: "Libertine",
      },
    },
    [
      // Header with squircle and website
      React.createElement(
        "div",
        {
          key: "header",
          style: {
            display: "flex",
            alignItems: "center",
            marginBottom: "80px",
          },
        },
        [
          // Blue squircle
          React.createElement("div", {
            key: "squircle",
            style: {
              width: "40px",
              height: "40px",
              backgroundColor: colors.blue,
              borderRadius: "10px",
              marginRight: "16px",
            },
          }),
          // Website text
          React.createElement(
            "span",
            {
              key: "website",
              style: {
                fontSize: "32px",
                color: "black",
                fontWeight: "400",
              },
            },
            "kylebutts.com",
          ),
        ],
      ),
      // Main content area
      React.createElement(
        "div",
        {
          key: "main-content",
          style: {
            display: "flex",
            flexDirection: "column",
            flex: "1",
            justifyContent: "flex-end",
            paddingBottom: "60px",
          },
        },
        [
          // Title (grows upward)
          React.createElement(
            "h1",
            {
              key: "title",
              style: {
                fontSize: "56px",
                fontWeight: "bold",
                lineHeight: "1.1",
                marginBottom: "40px",
                color: "black",
                margin: "0 0 40px 0",
              },
            },
            title,
          ),
          // Authors (fixed position from bottom)
          ...(authorText
            ? [
                React.createElement(
                  "p",
                  {
                    key: "authors",
                    style: {
                      fontSize: "32px",
                      color: colors.blue,
                      fontWeight: "400",
                      lineHeight: "1.3",
                      margin: "0",
                    },
                  },
                  authorText,
                ),
              ]
            : []),
        ],
      ),
    ],
  );

  try {
    // Generate SVG with Satori
    const svg = await satori(jsx, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Libertine",
          weight: 400,
          style: "normal",
          data: fs.readFileSync("public/fonts/LinuxLibertine_Regular.woff"),
        },
        {
          name: "Libertine",
          weight: 700,
          style: "normal",
          data: fs.readFileSync("public/fonts/LinuxLibertine_Bold.woff"),
        },
      ],
    });

    // Convert SVG to PNG using resvg
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return pngBuffer;
  } catch (error) {
    console.error("Error generating OG image:", error);
    throw error;
  }
}
