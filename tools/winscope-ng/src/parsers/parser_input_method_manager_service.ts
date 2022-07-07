/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {TraceTypeId} from "common/trace/type_id";
import {Parser} from './parser'
import {InputMethodManagerServiceTraceFileProto} from './proto_types';

class ParserInputMethodManagerService extends Parser {
  constructor(buffer: Uint8Array) {
    super(buffer);
  }

  getTraceTypeId(): TraceTypeId {
    return TraceTypeId.INPUT_METHOD_MANAGER_SERVICE;
  }

  override getMagicNumber(): number[] {
    return ParserInputMethodManagerService.MAGIC_NUMBER;
  }

  override decodeProto(buffer: Uint8Array): any[] {
    return (<any>InputMethodManagerServiceTraceFileProto.decode(buffer)).entry;
  }

  protected override getTimestamp(entryProto: any): number {
    return Number(entryProto.elapsedRealtimeNanos);
  }

  protected override processTraceEntryProto(entryProto: any): any {
    return entryProto;
  }

  private static readonly MAGIC_NUMBER = [0x09, 0x49, 0x4d, 0x4d, 0x54, 0x52, 0x41, 0x43, 0x45]; // .IMMTRACE
}

export {ParserInputMethodManagerService};