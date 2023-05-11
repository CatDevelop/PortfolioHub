import {createReactEditorJS} from 'react-editor-js'
import React, {useEffect} from "react";
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/nested-list'
import Warning from '@editorjs/warning'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from 'simple-image-editorjs'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
import AnyButton from 'editorjs-button'
import TextVariantTune from '@editorjs/text-variant-tune';
import Code from '@editorjs/code'
import Emoji from '@groupher/editor-emoji'

// import editorjsCodeflask from '@calumk/editorjs-codeflask';
import ToggleBlock from 'editorjs-toggle-block';
import AttachesTool from '@editorjs/attaches';
import InlineImage from 'editorjs-inline-image';
import Underline from '@editorjs/underline';
import ChangeCase from 'editorjs-change-case';
import Strikethrough from '@sotaproject/strikethrough';
import CodeBox from '@bomdi/codebox';
import DragDrop from 'editorjs-drag-drop';
import Loading from "../Loading/Loading";
import {usePortfolio} from "../../hooks/use-portfolio";
import {getProfile} from "../../store/slices/profileSlice";
import {getPortfolio} from "../../store/slices/portfolioSlice";
import {useDispatch} from "react-redux";

const i18n = {
    messages: {
        toolNames: {
            Link: 'Ссылка',
            Underline: 'Подчёркнутый',
            Strikethrough: 'Зачёркнутый',
            Bold: 'Полужирный',
            Italic: 'Курсив',
            ChangeCase: 'Регистр',
            Marker: 'Маркер',
            InlineCode: 'Моноширинный', // TODO
            "Text": "Текст",
            "Heading": "Заголовок",
            "List": "Список",
            "Warning": "Примечание",
            "Checklist": "Чеклист",
            "Quote": "Цитата",
            "Code": "Код",
            "Delimiter": "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            "Table": "Таблица",
            "Attachment": "Файл",
            "InlineImage": "Изображение по ссылке",
            // "Link": "Ссылка",
            // "Marker": "Маркер",
            // "Bold": "Полужирный",
            // "Italic": "Курсив",
            // "InlineCode": "Моноширинный",
        },
        tools: {
            "Warning": { // <-- 'Warning' tool will accept this dictionary section
                "Title": "Название",
                "Message": "Сообщение",
            }
        },
        ui: {
            "blockTunes": {
                "toggler": {
                    "Click to tune": "Нажмите, чтобы настроить",
                    "or drag to move": "или перетащите"
                },
            },
            "inlineToolbar": {
                "converter": {
                    "Convert to": "Конвертировать в"
                }
            },
            "toolbar": {
                "toolbox": {
                    "Add": "Добавить"
                }
            }
        },
        blockTunes: {
            "delete": {
                "Delete": "Удалить"
            },
            "moveUp": {
                "Move up": "Вверх"
            },
            "moveDown": {
                "Move down": "Вниз"
            },
            "textVariant": {
                "Details": "Детали",
                "Citation": "Цитата",
                "Call-out": "Предупреждение"
            }
        },
    }
}

const EDITOR_JS_TOOLS = {
    table: {
        class: Table,
        inlineToolbar: true,
    },
    textVariant: TextVariantTune,
    underline: Underline,
    strikethrough: Strikethrough,
    changeCase: {
        class: ChangeCase,
        config: {
            showLocaleOption: true, // enable locale case options
            locale: 'tr' // or ['tr', 'TR', 'tr-TR']
        }
    },
    attaches: {
        class: AttachesTool,
        config: {
            endpoint: 'http://localhost:3000/uploadFile'
        }
    },
    list: {
        class: List,
        inlineToolbar: true,
    },
    header: {
        class: Header,
        tunes: ['anyTuneName'],
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
            preserveBlank: true
        },
        tunes: ['anyTuneName', 'textVariant'],
    },
    anyTuneName: {
        class: AlignmentTuneTool,
        config: {
            default: "left",
            blocks: {
                header: 'center',
                list: 'left'
            }
        },
    },
    warning: Warning,
    inlineImage: {
        class: InlineImage,
        inlineToolbar: true,
        config: {
            embed: {
                display: true,
            },
            unsplash: {
                appName: 'Portfolio Hub',
                clientId: 'krIYOtKI1ukpgtQ0BHmFvhAALrP4ofOeg_DXn4G0ZJY'
            }
        }
    },
    code: {
        class: Code,
        config: {
            title: "Код"
        }
    },
    linkTool: LinkTool,
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: 'http://localhost:3000/uploadFile', // Your backend file uploader endpoint
                byUrl: 'http://localhost:3000/fetchUrl', // Your endpoint that provides uploading by Url
            }
        }
    },
    // raw: Raw,
    quote: Quote,
    marker: Marker,
    checklist: {
        class: CheckList,
        inlineToolbar: true,
    },
    delimiter: Delimiter,
    inlineCode: InlineCode,
    // simpleImage: SimpleImage,
    AnyButton: {
        class: AnyButton,
        inlineToolbar: false,
        config: {
            css: {
                "btnColor": "btn--gray",
            }
        }
    },
    // i18n: {
    //     messages: {
    //         tools: {
    //             image: {
    //                 'Upload an image': 'Up',
    //             }
    //         }
    //     }
    // }
}


function EditorJS(props) {
    console.log("Render EditorJS")
    // const portfolio = usePortfolio();
    //
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getPortfolio(props.userId));
    //     debugger
    // }, []);
    console.log(props.portfolio)
    const editorCore = React.useRef(null);

    const handleInitialize = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])

    const handleReady = () => {
        const editor = editorCore.current._editorJS;
        // new Undo({ editor })
        // new DragDrop(editor);
    };

    const handleSave = React.useCallback(async () => {
        const savedData = await editorCore.current.save();
        props.setPortfolioEdit(savedData);
        console.log(savedData)
    }, [])

    const ReactEditorJS = createReactEditorJS();
    // editorCore.current.value = props.portfolio;

    return <>
        <ReactEditorJS defaultValue={props.portfolio}
                       tools={EDITOR_JS_TOOLS}
                       placeholder={"Нажмите + или Tab, чтобы выбрать блок"}
                       i18n={i18n}
                       autofocus={true}
                       onInitialize={handleInitialize}
                       onReady={handleReady}
                       onChange={handleSave}
                       preserveBlank={true}
        />
        <button onClick={handleSave}>Сохранить форму</button>
    </>
}

export default EditorJS;
