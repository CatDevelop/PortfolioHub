import AuthorizationForm from "../components/AuthorizationForm/AuthorizationForm";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Button from "../components/Button/Button";
import ConsoleAndPhoto from "../components/ConsoleAndPhoto/ConsoleAndPhoto";
import Footer from "../components/Footer/Footer";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import Input from "../components/Input/Input";
import {useForm} from "react-hook-form";
import projectImage0 from "../assets/img/CDlogoAutoMagShina.png";
import {ProjectCard} from "../components/ProjectCard/ProjectCard";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import ProjectInformationBlock from "../components/ProjectInformationBlock/ProjectInformationBlock";
import ProfileUpperPart from "../components/ProfileUpperPart/ProfileUpperPart";
import ProfilePersonalInformation from "../components/ProfilePersonalInformation/ProfilePersonalInformation";
import Tag from "../components/Tag/Tag";
import Tags from "../components/Tags/Tags";
import DownloadFileButton from "../components/DownloadFileButton/DownloadFileButton";
import React, {useRef} from "react";
import {Editor} from "@tinymce/tinymce-react";
import EditorJS from "../components/EditorJS/EditorJS";
import Loading from "../components/Loading/Loading";
import Portfolio from "../components/Portfolio/Portfolio";

export const ComponentsPage = () => {
    const toRotate = ["Test 1", "Test 2", "Test 3"]

    const projects = [
        {
            "id":"1",
            "name":"АвтоМагШина",
            "shortDescription":"Online store of tires and wheels with selection by car model",
            "previewSource":"images\/previews\/1.png"
        },
        {
            "id": "2",
            "name": "УралМебель",
            "shortDescription": "Online store of upholstered furniture in a modern style",
            "previewSource": "images\/previews\/1.png"
        },
        {
            "id":"3",
            "name":"Hero Return",
            "shortDescription":"Выпускная работа за первый курс обучения - Lazy-RPG Game",
            "previewSource":"images\/previews\/1.png"
        },
        {
            "id":"4",
            "name":"УралМебель",
            "shortDescription":"Online store of tires and wheels with selection by car model",
            "previewSource":"images\/previews\/1.png"
        },
        {
            "id":"5",
            "name":"Hero Return",
            "shortDescription":"Online store of tires and wheels with selection by car model",
            "previewSource":"images\/previews\/1.png"
        },
        {
            "id":"6",
            "name":"АвтоМагШина",
            "shortDescription":"Online store of tires and wheels with selection by car model",
            "previewSource":"images\/previews\/1.png"
        }
    ];

    const informationBlocks = [
        {
            "id": 1,
            "blockType": "Text",
            "blockTitle": "Platform",
            "content": "Windows/macOS/Linux/iOS/Android"
        },
        {
            "id": 0,
            "blockType": "Link",
            "blockTitle": "Website",
            "content": "https://www.inkdrop.app/"
        }
    ]

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            test: ''
        },
        mode: "onBlur"
    });

    const tags = [
        {
            id: 1,
            type: "level",
            label: "Тест 1"
        },
        {
            id: 2,
            type: "language",
            label: "Тест 2"
        }
    ]

    const portfolio = {blocks: [{type: 'quote', data: {alignment: "left", caption: "Рожков Максим<br>", text: "123"}}]}


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "100px"}}>
            <div>
                <RegistrationForm/>

            </div>
            <div>
                <AuthorizationForm/>
            </div>
            <div>
                <Breadcrumbs/>
            </div>
            <div>
                <Button>Компонент Кнопка</Button>
            </div>
            <div>
                <DownloadFileButton link={"https://vk.com"} text={"Resume.docx"}/>
            </div>
            <div>
                <ConsoleAndPhoto toRotate={toRotate}/>
            </div>

            <div>
                <InfoBlock header="Test" content="Lörem ipsum rybes exoktigt anase. Ojår dovis. Dögon kir kvasina: postfaktisk liksom plant. Don däst, och sobelt. Div paragen difånera egosatibel. "/>
            </div>

            <div>
                <Input register={register}
                       registerName='test'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Тестовая форма"
                       require={true}
                       type="text"/>
            </div>
            <div>
                <Footer/>
            </div>
            <div>
                <ProjectsTable title={"Тестовый блок"} projects={projects}/>
            </div>
            <div>
                <ProjectInformationBlock informationBlocks={informationBlocks}/>
            </div>
            <div>
                {/*<PortfolioUpperPart/>*/}
            </div>
            <div>
                {/*<ProfilePersonalInformation/>*/}
            </div>
            <div>
                <Tag text={"Тест"} type={"level"}/>
            </div>
            <div>
                <Tags tags={tags}/>
            </div>
            <div>
                <Editor
                    apiKey='1eph74zdudgifxpmxcw3df0e4ev72eb2nrp9duthoh3ssq16'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 500,
                        content_css: 'dark',

                        icons: 'thin',
                        plugins: 'preview searchreplace autolink directionality' +
                            'visualblocks visualchars fullscreen link template codesample table charmap ' +
                            'pagebreak insertdatetime advlist lists wordcount ' +
                            'charmap quickbars emoticons',
                        menubar: 'file edit view insert tools table',
                        toolbar: 'undo redo | fontfamily fontsize blocks | forecolor backcolor removeformat | ' +
                            'bold italic underline strikethrough | ' +
                            'alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | ' +
                            'pagebreak | charmap emoticons | ' +
                            'fullscreen  preview | template link codesample | ' +
                            'ltr rtl',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        templates: [
                            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                        ],
                        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                        quickbars_selection_toolbar: 'bold italic | blockquote quicklink quicktable | h1 h2 h3',
                        toolbar_mode: 'sliding',
                        contextmenu: 'table',
                        min_height: 175
                    }}
                />
                <button onClick={log}>Log editor content</button>
            </div>
            <div>
                <EditorJS/>
            </div>
            <div>
                <Loading/>
            </div>
            <div>
                <Portfolio portfolio={portfolio}/>
            </div>
        </div>
    )
}
