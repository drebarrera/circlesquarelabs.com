import icons from '@/data/icons.json';

export const Icon = ({icon, classData, onClick, title=""}) => {
    return <div dangerouslySetInnerHTML={{ __html: icons[icon] }} className={`${classData}`} onClick={onClick} title={title}></div>;
};