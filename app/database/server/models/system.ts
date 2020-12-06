// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import field from '@nozbe/watermelondb/decorators/field';
import json from '@nozbe/watermelondb/decorators/json';
import {Model} from '@nozbe/watermelondb';

import {MM_TABLES} from '@constants/database';

const {SYSTEM} = MM_TABLES.SERVER;

export default class System extends Model {
    static table = SYSTEM

    @field('name') name!: string
    @json('value', (rawJson) => rawJson) value!: string[]
}
