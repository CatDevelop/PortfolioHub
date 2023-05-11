import React from 'react';
import s from './Portfolio.module.css';
import classNames from "classnames/bind";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function PreCode (props) {
    return <p className={s.preCode}>{props.children}</p>
}

function Code (props) {
    return <code className={s.code}>{props.children}</code>
}

function Portfolio (props) {
    console.log(props.portfolio)

    const createList = (items, isOrdered) => {
        console.log("ITEMS ", items, isOrdered)
        return (
            <ul className={s.nestedList}>
                {
                    items.map(item => {
                        console.log("ITEM ", item)
                        return (
                            <li className={classNames(s.nestedListItem, isOrdered ? s.nestedListItemOrdered : s.nestedListItemUnordered)}>
                                <div>
                                    <div dangerouslySetInnerHTML={{__html: item.content}}/>
                                    {
                                        item.items[0]?
                                            createList(item.items, isOrdered) :<></>
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )

    }

    const createChecklist = (items) => {
        return (
            <div className={s.checklist}>
                {
                    items?.map(item => {
                        return <div><label className={s.checklistItem}>
                            <input type="checkbox" checked={item.checked}/>
                            <div dangerouslySetInnerHTML={{__html: item.text}}/>
                            {/*<span>{item.text}</span>*/}
                        </label></div>
                    })
                }
            </div>
        )
    }

    const createTable = (data) => {
        const columnsCount = data.content[0].length;
        console.log(columnsCount)
        return (
            <div className={s.table}>
                {
                    data.withHeadings?
                        <div className={classNames(s.tableRow, s.tableHeadings)} style={{gridTemplateColumns:"1fr ".repeat(columnsCount)}}>
                            {
                                data.content[0].map(cell => {
                                    return <div className={classNames(s.tableCell, s.tableHeadingsCell)} dangerouslySetInnerHTML={{__html: cell}}/>
                                })
                            }
                        </div> :
                        <div className={s.tableRow} style={{gridTemplateColumns:"1fr ".repeat(columnsCount)}}>
                            {
                                data.content[0].map(cell => {
                                    return <div className={s.tableCell} dangerouslySetInnerHTML={{__html: cell}}/>
                                })
                            }
                        </div>
                }
                {
                    data.content.map((row, index) => {
                        return index === 0 ? <></> :
                            <div className={s.tableRow} style={{gridTemplateColumns:"1fr ".repeat(columnsCount)}}>
                                {
                                    row.map(cell => {
                                        return <div className={s.tableCell} dangerouslySetInnerHTML={{__html: cell}}/>
                                    })
                                }
                            </div>
                    })
                }
                {/*{*/}
                {/*    items?.map(item => {*/}
                {/*        return <div><label className={s.checklistItem}>*/}
                {/*            <input type="checkbox" checked={item.checked}/>*/}
                {/*            <div dangerouslySetInnerHTML={{__html: item.text}}/>*/}
                {/*            /!*<span>{item.text}</span>*!/*/}
                {/*        </label></div>*/}
                {/*    })*/}
                {/*}*/}
            </div>
        )
    }


    return (
        <div className={s.portfolio}>
            {
                props.portfolio.blocks?.map(block => {
                    if(block.type === "header") {
                        if(block.data.level === 1)
                            return <h1 className={classNames(s.h1, s[block.tunes.anyTuneName.alignment])}>{block.data.text}</h1>
                        if(block.data.level === 2)
                            return <h2 className={classNames(s.h2, s[block.tunes.anyTuneName.alignment])}>{block.data.text}</h2>
                        if(block.data.level === 3)
                            return <h3 className={classNames(s.h3, s[block.tunes.anyTuneName.alignment])}>{block.data.text}</h3>
                        if(block.data.level === 4)
                            return <h4 className={classNames(s.h4, s[block.tunes.anyTuneName.alignment])}>{block.data.text}</h4>
                        if(block.data.level === 5)
                            return <h5 className={classNames(s.h5, s[block.tunes.anyTuneName.alignment])}>{block.data.text}</h5>
                        if(block.data.level === 6)
                            return <h6 className={classNames(s.h6, s[block.tunes.anyTuneName.alignment])}>{block.data.text}</h6>
                    }

                    if(block.type === "paragraph") {
                        if(!block.data.text)
                            return <p className={classNames(s.p, s[block.tunes.anyTuneName.alignment])}><br/></p>
                        else
                            return <div className={classNames(s.p, s[block.tunes.anyTuneName.alignment])}
                                    dangerouslySetInnerHTML={{__html: block.data.text}}/>
                    }

                    if(block.type === "delimiter") {
                        return <div className={classNames(s.delimiter)}/>
                    }

                    if(block.type === "list") {
                        return createList(block.data.items, block.data.style === "ordered")
                    }

                    if(block.type === "checklist")
                        return createChecklist(block.data.items)

                    if(block.type === "table")
                        return createTable(block.data)

                    if(block.type === "code")
                        return (
                            <div className={s.codeContainer}>
                                <p className={s.codeContainerTitle}>JavaScript</p>
                            <SyntaxHighlighter language="javascript"
                                               style={oneDark}
                                               showLineNumbers
                                               // wrapLines={true}
                                               // wrapLongLines={true}
                                               PreTag={PreCode}
                                               CodeTag={Code}
                            >
                                {block.data.code}
                            </SyntaxHighlighter>
                            </div>
                        );

                    if(block.type === "quote")
                        return (
                            <div className={s.quoteContainer}>
                                <div className={s.quoteTextContainer}>

                                    <div className={classNames(s.quoteText)}
                                         dangerouslySetInnerHTML={{__html: block.data.text}}/>
                                </div>
                                <div className={s.quoteCaption}>
                                    <p className={s.quoteCaptionDecoration}>-</p>
                                    <div className={classNames(s.quoteCaptionText)}
                                         dangerouslySetInnerHTML={{__html: block.data.caption}}/>
                                </div>

                            </div>
                        )
                })
            }
        </div>
    )
}

export default Portfolio;
