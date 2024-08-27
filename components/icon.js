import icons from '@/data/icons.json';

export const Icon = ({icon, classData, onClick}) => {
    return <div dangerouslySetInnerHTML={{ __html: icons[icon] }} className={`${classData}`} onClick={onClick}></div>;
};