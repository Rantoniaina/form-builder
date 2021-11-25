/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     25/11/2021 22:28:48                          */
/*==============================================================*/


drop view FORM_DETAILS;

drop index ASSOCIATION_1_FK;

drop index FORM_PK;

drop table FORM;

drop index FORM_ELEMENT_FK2;

drop index FORM_ELEMENT_FK;

drop table FORM_ELEMENT;

drop index FORM_TYPE_PK;

drop table FORM_TYPE;

drop index USER_PK;

drop table FORM_USER;

/*==============================================================*/
/* Table: FORM                                                  */
/*==============================================================*/
create table FORM (
   ID                   SERIAL               not null,
   FOR_ID               INT4                 not null,
   TITLE                VARCHAR(50)          not null,
   DESCRIPTION          VARCHAR(255)         null,
   constraint PK_FORM primary key (ID)
);

/*==============================================================*/
/* Index: FORM_PK                                               */
/*==============================================================*/
create unique index FORM_PK on FORM (
ID
);

/*==============================================================*/
/* Index: ASSOCIATION_1_FK                                      */
/*==============================================================*/
create  index ASSOCIATION_1_FK on FORM (
FOR_ID
);

/*==============================================================*/
/* Table: FORM_ELEMENT                                          */
/*==============================================================*/
create table FORM_ELEMENT (
   ID                   INT4                 not null,
   FOR_ID               INT4                 not null,
   ISMANDATORY          BOOL                 not null,
   TITLE                VARCHAR(255)         not null,
   OPTIONS              VARCHAR(1000)        null
);

/*==============================================================*/
/* Index: FORM_ELEMENT_FK                                       */
/*==============================================================*/
create  index FORM_ELEMENT_FK on FORM_ELEMENT (
ID
);

/*==============================================================*/
/* Index: FORM_ELEMENT_FK2                                      */
/*==============================================================*/
create  index FORM_ELEMENT_FK2 on FORM_ELEMENT (
FOR_ID
);

/*==============================================================*/
/* Table: FORM_TYPE                                             */
/*==============================================================*/
create table FORM_TYPE (
   ID                   SERIAL               not null,
   NAME                 VARCHAR(15)          not null,
   ENTRY_TYPE           VARCHAR(20)          not null,
   constraint PK_FORM_TYPE primary key (ID)
);

/*==============================================================*/
/* Index: FORM_TYPE_PK                                          */
/*==============================================================*/
create unique index FORM_TYPE_PK on FORM_TYPE (
ID
);

/*==============================================================*/
/* Table: FORM_USER                                             */
/*==============================================================*/
create table FORM_USER (
   ID                   SERIAL               not null,
   NAME                 VARCHAR(60)          not null,
   constraint PK_FORM_USER primary key (ID)
);

/*==============================================================*/
/* Index: USER_PK                                               */
/*==============================================================*/
create unique index USER_PK on FORM_USER (
ID
);

/*==============================================================*/
/* View: FORM_DETAILS                                           */
/*==============================================================*/
create or replace view FORM_DETAILS as
SELECT f.id as form_id, f.title as form_title, f.description as form_description, fu.name as username, fe.ismandatory as form_element_mandatory, fe.title as form_element_title, fe.options as form_element_options, ft.name as form_type_name, ft.entry_type as form_type_entry_type
FROM form f
JOIN form_user fu
ON fu.id = f.for_id
JOIN form_element fe
ON fe.for_id = f.id
JOIN form_type ft
ON ft.id = fe.id;

alter table FORM
   add constraint FK_FORM_ASSOCIATI_FORM_USE foreign key (FOR_ID)
      references FORM_USER (ID)
      on delete restrict on update restrict;

alter table FORM_ELEMENT
   add constraint FK_FORM_ELE_FORM_ELEM_FORM foreign key (FOR_ID)
      references FORM (ID)
      on delete restrict on update restrict;

alter table FORM_ELEMENT
   add constraint FK_FORM_ELE_FORM_ELEM_FORM_TYP foreign key (ID)
      references FORM_TYPE (ID)
      on delete restrict on update restrict;

INSERT INTO form_type
(name,entry_type)
VALUES
('Input', 'single_value'),
('TextArea', 'single_value'),
('Paragraph', 'single_value'),
('Button', 'action'),
('Select', 'multiple_value'),
('Checkbox', 'multiple_value'),
('Radio Button', 'multiple_value');