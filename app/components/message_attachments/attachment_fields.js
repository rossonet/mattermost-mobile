// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

import Markdown from '@components/markdown';
import {makeStyleSheetFromTheme} from '@utils/theme';

export default class AttachmentFields extends PureComponent {
    static propTypes = {
        baseTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
        blockStyles: PropTypes.object.isRequired,
        fields: PropTypes.array,
        metadata: PropTypes.object,
        onPermalinkPress: PropTypes.func,
        textStyles: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    render() {
        const {
            baseTextStyle,
            blockStyles,
            fields,
            metadata,
            onPermalinkPress,
            textStyles,
            theme,
        } = this.props;

        if (!fields?.length) {
            return null;
        }

        const style = getStyleSheet(theme);
        const fieldTables = [];

        let fieldInfos = [];
        let rowPos = 0;
        let lastWasLong = false;
        let nrTables = 0;

        fields.forEach((field, i) => {
            if (rowPos === 2 || !(field.short === true) || lastWasLong) {
                fieldTables.push(
                    <View
                        key={`attachment__table__${nrTables}`}
                        style={style.field}
                    >
                        {fieldInfos}
                    </View>,
                );
                fieldInfos = [];
                rowPos = 0;
                nrTables += 1;
                lastWasLong = false;
            }

            fieldInfos.push(
                <View
                    style={style.flex}
                    key={`attachment__field-${i}__${nrTables}`}
                >
                    {Boolean(field.title) && (
                        <View
                            style={style.headingContainer}
                            key={`attachment__field-caption-${i}__${nrTables}`}
                        >
                            <View>
                                <Text style={style.heading}>
                                    {field.title}
                                </Text>
                            </View>
                        </View>
                    )}
                    <View
                        style={style.flex}
                        key={`attachment__field-${i}__${nrTables}`}
                    >
                        <Markdown
                            baseTextStyle={baseTextStyle}
                            textStyles={textStyles}
                            blockStyles={blockStyles}
                            disableGallery={true}
                            imagesMetadata={metadata?.images}
                            value={(field.value || '')}
                            onPermalinkPress={onPermalinkPress}
                        />
                    </View>
                </View>,
            );

            rowPos += 1;
            lastWasLong = !(field.short === true);
        });

        if (fieldInfos.length > 0) { // Flush last fields
            fieldTables.push(
                <View
                    key={`attachment__table__${nrTables}`}
                    style={style.table}
                >
                    {fieldInfos}
                </View>,
            );
        }

        return (
            <View>
                {fieldTables}
            </View>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        field: {
            alignSelf: 'stretch',
            flexDirection: 'row',
        },
        flex: {
            flex: 1,
        },
        headingContainer: {
            alignSelf: 'stretch',
            flexDirection: 'row',
            marginBottom: 5,
            marginTop: 10,
        },
        heading: {
            color: theme.centerChannelColor,
            fontWeight: '600',
        },
        table: {
            flex: 1,
            flexDirection: 'row',
        },
    };
});
