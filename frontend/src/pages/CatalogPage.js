import React, {useEffect, useState} from "react";
import {getProfile} from "../store/slices/profileSlice";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useProfile} from "../hooks/use-profile";
import Loading from "../components/Loading/Loading";
import {useUsers} from "../hooks/use-users";
import {getUsers} from "../store/slices/usersSlice";
import Catalog from "../components/Catalog/Catalog";
import PageTitle from "../components/PageTitle/PageTitle";
import {useAuth} from "../hooks/use-auth";
import {useForm} from "react-hook-form";
import s from "./Pages.module.css";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Form from "react-bootstrap/Form";
import TagInput from "../components/TagInput/TagInput";
import TagFilter from "../components/TagFilter/TagFilter";
import Dropdown from "../components/Dropdown/Dropdown";

export const CatalogPage = () => {
    //const {userId} = useParams();
    const dispatch = useDispatch();

    const profile = useProfile();
    let users = useUsers();
    let user = useAuth();

    const sortList = [
        {value: "projects", label: "количеству проектов"},
        {value: "likes", label: "рейтингу"}
    ]

    const [selectedLanguageTags, setSelectedLanguageTags] = useState([]);
    const [selectedRoleTags, setSelectedRoleTags] = useState([]);
    const [selectedLevelTags, setSelectedLevelTags] = useState([]);
    const [selectedSort, setSelectedSort] = useState(sortList[0]);

    useEffect(() => {
        dispatch(getProfile(user.id));
        dispatch(getUsers());
    }, []);

    const {register, watch, getValues, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            searchBar: ''
        },
        mode: "onBlur"
    });

    if (profile.isLoading || users.isLoading)
        return <Loading/>

    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return !(a.indexOf(i) > -1);});
    };

    function trimString(s) {
        let l=0, r=s.length -1;
        while(l < s.length && s[l] == ' ') l++;
        while(r > l && s[r] == ' ') r-=1;
        return s.substring(l, r+1);
    }

    function compareObjects(o1, o2) {
        let k = '';
        for(k in o1) if(o1[k] != o2[k]) return false;
        for(k in o2) if(o1[k] != o2[k]) return false;
        return true;
    }

    function itemExists(haystack, needle) {
        for(let i=0; i<haystack.length; i++) if(compareObjects(haystack[i], needle)) return true;
        return false;
    }

    let searchCriteria = [
        "surname", "name", "shortDescription"
    ]

    function searchFor(toSearch, object, searchCriteria) {
        let results = [];
        toSearch = trimString(toSearch); // trim it
        for(let i=0; i<object.length; i++) {
            let c = searchCriteria.slice()
            if(object[i].isVisibleEmail === "1")
                c.push("email")
            for(let key in object[i]) {
                if(c.includes(key)) {
                    if(object[i][key].toLowerCase().indexOf(toSearch.toLowerCase())!=-1) {
                        if(!itemExists(results, object[i])) results.push(object[i]);
                    }
                }
            }
        }
        return results;
    }

    const watchSearchBar = watch("searchBar", "")

    const onClick = () => {}

    console.log(searchFor(getValues("searchBar"), users.users,searchCriteria));
    console.log(selectedLanguageTags, selectedRoleTags, selectedLevelTags, selectedSort);

    let u = users.users.slice()

    if(selectedLanguageTags.length !== 0)
        u = u.filter(us => us.tags.length !== 0 ? selectedLanguageTags.map(sl => sl.value).diff(JSON.parse(us.tags).map(tag => tag.value)).length === 0 : 0)

    if(selectedRoleTags.length !== 0)
        u = u.filter(us => us.tags.length !== 0 ? selectedRoleTags.map(sr => sr.value).diff(JSON.parse(us.tags).map(tag => tag.value)).length === 0 : 0)

    if(selectedLevelTags.length !== 0)
        u = u.filter(us => us.tags.length !== 0 ? selectedLevelTags.map(sl => sl.value).diff(JSON.parse(us.tags).map(tag => tag.value)).length === 0 : 0)

    return (
        <div>
            <PageTitle title={"Каталог пользователей"}/>

            <Form className={s.catalogFilters} onSubmit={handleSubmit(onClick)}>
                <Input register={register}
                       registerName='searchBar'
                       options={
                           {
                               // required: true
                           }
                       }
                       placeholder={"Поиск"}
                       errors={errors}
                       // require={true}
                       type="text"/>
                <div className={s.catalogDownFilters}>
                    <TagFilter
                        // title='Теги'
                        selectedOptions={selectedLanguageTags}
                        setSelectedOptions={setSelectedLanguageTags}
                        filter={"language"}
                    />
                    <TagFilter
                        // title='Теги'
                        selectedOptions={selectedRoleTags}
                        setSelectedOptions={setSelectedRoleTags}
                        filter={"role"}
                    />
                    <TagFilter
                        // title='Теги'
                        selectedOptions={selectedLevelTags}
                        setSelectedOptions={setSelectedLevelTags}
                        filter={"level"}
                    />
                </div>

                <div className={s.catalogSort}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6H21" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 12H21" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 18H21" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 6H3.01" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 12H3.01" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 18H3.01" stroke="#81E6D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Сортировать по
                    <Dropdown options={sortList} minWidth="220px" onChange={setSelectedSort} value={selectedSort}/>
                </div>
            </Form>

            <Catalog watchSearchBar={watchSearchBar} users={

                getValues("searchBar").length !== 0 ? searchFor(getValues("searchBar"), u.sort((u1, u2) => {
                    if(selectedSort.value === "projects")
                        return u2.projectsCount - u1.projectsCount
                    if(selectedSort.value === "likes")
                        return u2.likesCount - u1.likesCount
                }), searchCriteria): u.sort((u1, u2) => {
                    if(selectedSort.value === "projects")
                        return u2.projectsCount - u1.projectsCount
                    if(selectedSort.value === "likes")
                        return u2.likesCount - u1.likesCount
                })
            }
            />

        </div>
    )
}
