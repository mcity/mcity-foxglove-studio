// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2020-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import { RosValue } from "@foxglove-studio/app/players/types";
import { BinaryHeader } from "@foxglove-studio/app/types/BinaryMessages";
import { RosDatatypes } from "@foxglove-studio/app/types/RosDatatypes";
import { ArrayView } from "@foxglove-studio/app/util/binaryObjects/ArrayViews";

export const definitions: RosDatatypes = {
  "std_msgs/Header": {
    fields: [
      { type: "uint32", name: "seq" },
      { type: "time", name: "stamp" },
      { type: "string", name: "frame_id" },
    ],
  },
  "fake_msgs/HasComplexAndArray": {
    fields: [
      { type: "std_msgs/Header", name: "header" },
      { type: "string", isArray: true, name: "stringArray" },
    ],
  },
  "fake_msgs/HasComplexArray": {
    fields: [{ type: "fake_msgs/HasComplexAndArray", name: "complexArray", isArray: true }],
  },
  "fake_msgs/HasConstant": {
    fields: [{ type: "uint8", name: "const", isConstant: true, value: 1 }],
  },
  "fake_msgs/HasByteArray": {
    fields: [{ type: "uint8", name: "byte_array", isArray: true }],
  },
  "fake_msgs/HasJson": {
    fields: [{ type: "json", name: "jsonField" }],
  },
  "fake_msgs/HasInt64s": {
    fields: [
      { type: "int64", name: "i64" },
      { type: "uint64", name: "u64" },
    ],
  },
  "fake_msgs/HasArrayOfEmpties": {
    fields: [{ type: "fake_msgs/HasConstant", name: "arr", isArray: true }],
  },
  "fake_msgs/ContainsEverything": {
    fields: [
      { type: "std_msgs/Header", name: "first" },
      { type: "fake_msgs/HasComplexAndArray", name: "second" },
      { type: "fake_msgs/HasComplexArray", name: "third" },
      { type: "fake_msgs/HasConstant", name: "fourth" },
      { type: "fake_msgs/HasByteArray", name: "fifth" },
      { type: "fake_msgs/HasJson", name: "sixth" },
      { type: "fake_msgs/HasInt64s", name: "seventh" },
      { type: "fake_msgs/HasArrayOfEmpties", name: "eighth" },
    ],
  },
};

export type HasComplexAndArray = Readonly<{
  header(): BinaryHeader;
  stringArray(): ArrayView<string>;
}>;

export type HasComplexArray = Readonly<{
  complexArray(): ArrayView<HasComplexAndArray>;
}>;

export type HasConstant = Readonly<{
  const(): number;
}>;

export type HasByteArray = Readonly<{
  byte_array(): Uint8Array;
}>;

export type HasJson = Readonly<{
  jsonField(): RosValue;
}>;

export type HasInt64s = Readonly<{
  i64(): number;
  u64(): number;
}>;

export type HasArrayOfEmpties = Readonly<{
  arr(): ArrayView<HasConstant>;
}>;

export type ContainsEverything = Readonly<{
  first(): BinaryHeader;
  second(): HasComplexAndArray;
  third(): HasComplexArray;
  fourth(): HasConstant;
  fifth(): HasByteArray;
  sixth(): HasJson;
  seventh(): HasInt64s;
  eighth(): HasArrayOfEmpties;
}>;
