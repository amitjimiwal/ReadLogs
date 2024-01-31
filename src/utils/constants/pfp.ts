export const ProfilepictureTypes=[
     "adventurer","avataaars","bottts"
]
//select and export a random pfp
export const randomProfilepictureType=()=>{
    return ProfilepictureTypes[Math.floor(Math.random()*ProfilepictureTypes.length)]
}