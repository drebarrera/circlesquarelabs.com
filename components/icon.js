import icons from '@/data/icons.json';

export const Icon = ({icon, classData}) => {
    return <div dangerouslySetInnerHTML={{ __html: icons[icon] }} className={`${classData}`}></div>;
};