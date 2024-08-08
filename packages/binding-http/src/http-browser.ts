/********************************************************************************
 * Copyright (c) 2019 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the W3C Software Notice and
 * Document License (2015-05-13) which is available at
 * https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document.
 *
 * SPDX-License-Identifier: EPL-2.0 OR W3C-20150513
 ********************************************************************************/

import { Form, SecurityScheme } from "@node-wot/core";

import { Headers, Response } from "node-fetch";

export { default as HttpClient } from "./http-client";
export { default as HttpClientFactory } from "./http-client-factory";
export { default as HttpsClientFactory } from "./https-client-factory";
export * from "./http-client";
export * from "./http-client-factory";
export * from "./https-client-factory";

export interface HttpProxyConfig {
    href: string;
    scheme?: string;
    token?: string;
    username?: string;
    password?: string;
}

export interface HttpConfig {
    port?: number;
    address?: string;
    proxy?: HttpProxyConfig;
    allowSelfSigned?: boolean;
    serverKey?: string;
    serverCert?: string;
    security?: SecurityScheme;
}

export class HttpHeader {
    public "http:fieldName": number;
    public "http:fieldValue": unknown;
}

export class HttpForm extends Form {
    public "http:methodName"?: string; // "GET", "PUT", "POST", "DELETE"
    public "http:headers"?: Array<HttpHeader> | HttpHeader;
}

Headers.prototype.raw = function () {
    const result: { [key: string]: string[] } = {};
    for (const [headerKey, headerValue] of this.entries()) {
        result[headerKey] = headerValue.split(",");
    }
    return result;
};

Response.prototype.buffer = async function () {
    return Buffer.from(await this.arrayBuffer());
};
