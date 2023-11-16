--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Ubuntu 14.3-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.3 (Ubuntu 14.3-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    address_id bigint NOT NULL,
    a_user_id bigint,
    land_mark character varying,
    city character varying,
    pincode character varying,
    address character varying,
    default_add boolean
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: address_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_address_id_seq OWNER TO postgres;

--
-- Name: address_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_address_id_seq OWNED BY public.address.address_id;


--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    cart_id bigint NOT NULL,
    c_user_id bigint
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_cart_id_seq OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;


--
-- Name: cart_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_data (
    cart_data_id bigint NOT NULL,
    c_product_id bigint,
    c_cart_id bigint,
    c_color_id bigint,
    c_size_id bigint,
    number_of_product character varying
);


ALTER TABLE public.cart_data OWNER TO postgres;

--
-- Name: cart_data_cart_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_data_cart_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_data_cart_data_id_seq OWNER TO postgres;

--
-- Name: cart_data_cart_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_data_cart_data_id_seq OWNED BY public.cart_data.cart_data_id;


--
-- Name: catagories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.catagories (
    catagory_id bigint NOT NULL,
    catagory_name character varying,
    thumb_nail_image character varying
);


ALTER TABLE public.catagories OWNER TO postgres;

--
-- Name: catagory_catagory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.catagory_catagory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.catagory_catagory_id_seq OWNER TO postgres;

--
-- Name: catagory_catagory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.catagory_catagory_id_seq OWNED BY public.catagories.catagory_id;


--
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    color_id bigint NOT NULL,
    color_name character varying,
    c_product_id bigint
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- Name: colors_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colors_color_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.colors_color_id_seq OWNER TO postgres;

--
-- Name: colors_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colors_color_id_seq OWNED BY public.colors.color_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    name character varying,
    email character varying NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_customer_id_seq OWNER TO postgres;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- Name: order_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_data (
    order_data_id bigint NOT NULL,
    o_product_id bigint,
    o_order_id bigint,
    o_no_of_product bigint,
    o_c_color_id bigint,
    o_c_size_id bigint,
    product_price character varying
);


ALTER TABLE public.order_data OWNER TO postgres;

--
-- Name: order_data_order_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_data_order_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_data_order_data_id_seq OWNER TO postgres;

--
-- Name: order_data_order_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_data_order_data_id_seq OWNED BY public.order_data.order_data_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id bigint NOT NULL,
    o_user_id bigint,
    order_flag boolean,
    price bigint,
    rp_transactionid character varying,
    razorpay_order_id character varying,
    created_at character varying,
    o_address_id bigint
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: product_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_image (
    product_image_id bigint NOT NULL,
    p_product_id bigint,
    image_name character varying
);


ALTER TABLE public.product_image OWNER TO postgres;

--
-- Name: product_image_product_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_image_product_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_image_product_image_id_seq OWNER TO postgres;

--
-- Name: product_image_product_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_image_product_image_id_seq OWNED BY public.product_image.product_image_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id bigint NOT NULL,
    p_sub_catagory_id bigint,
    product_name character varying,
    price bigint,
    discount character varying,
    top_deals boolean,
    final_price character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_product_id_seq OWNER TO postgres;

--
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.products.product_id;


--
-- Name: sizes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sizes (
    size_id bigint NOT NULL,
    available_size character varying,
    s_product_id bigint
);


ALTER TABLE public.sizes OWNER TO postgres;

--
-- Name: sizes_size_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sizes_size_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sizes_size_id_seq OWNER TO postgres;

--
-- Name: sizes_size_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sizes_size_id_seq OWNED BY public.sizes.size_id;


--
-- Name: sub_catagories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_catagories (
    sub_catagory_id bigint NOT NULL,
    sub_catagory_name character varying,
    sc_image character varying,
    sc_catagory_id bigint
);


ALTER TABLE public.sub_catagories OWNER TO postgres;

--
-- Name: sub_catagory_sub_catagory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sub_catagory_sub_catagory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sub_catagory_sub_catagory_id_seq OWNER TO postgres;

--
-- Name: sub_catagory_sub_catagory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sub_catagory_sub_catagory_id_seq OWNED BY public.sub_catagories.sub_catagory_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    first_name character varying,
    last_name character varying,
    email character varying,
    password character varying,
    phone_number character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public.users.user_id;


--
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_address_id_seq'::regclass);


--
-- Name: cart cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);


--
-- Name: cart_data cart_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_data ALTER COLUMN cart_data_id SET DEFAULT nextval('public.cart_data_cart_data_id_seq'::regclass);


--
-- Name: catagories catagory_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catagories ALTER COLUMN catagory_id SET DEFAULT nextval('public.catagory_catagory_id_seq'::regclass);


--
-- Name: colors color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN color_id SET DEFAULT nextval('public.colors_color_id_seq'::regclass);


--
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- Name: order_data order_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_data ALTER COLUMN order_data_id SET DEFAULT nextval('public.order_data_order_data_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: product_image product_image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image ALTER COLUMN product_image_id SET DEFAULT nextval('public.product_image_product_image_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- Name: sizes size_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes ALTER COLUMN size_id SET DEFAULT nextval('public.sizes_size_id_seq'::regclass);


--
-- Name: sub_catagories sub_catagory_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_catagories ALTER COLUMN sub_catagory_id SET DEFAULT nextval('public.sub_catagory_sub_catagory_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (address_id, a_user_id, land_mark, city, pincode, address, default_add) FROM stdin;
5	2	kapodra	surat	395006	mangaldeep	t
6	2	kapodra	surat	395006	mangaldeep	f
14	1	fgfg	fgf	789076	gfgf	f
11	1	dsds	dsdsd	395006	dsdsd	f
15	1	fgfg	ghghh	789076	mangaldeep123	f
12	1	dsds	dsdsd	395006	utraan	t
16	11	kapodra	surat	395006	utraan	t
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (cart_id, c_user_id) FROM stdin;
77	0
52	1
78	0
53	1
79	0
54	1
80	0
56	11
57	1
58	1
81	1
59	1
60	1
61	1
82	1
62	1
83	0
63	1
64	1
65	1
66	0
84	1
67	1
68	1
69	1
85	1
86	1
87	0
70	1
88	0
89	1
71	1
90	1
91	1
72	1
73	0
74	0
92	0
93	1
75	1
94	1
76	1
95	1
96	1
97	1
98	1
99	1
100	1
\.


--
-- Data for Name: cart_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_data (cart_data_id, c_product_id, c_cart_id, c_color_id, c_size_id, number_of_product) FROM stdin;
500	237	87	0	0	1
501	237	88	0	0	1
506	237	92	0	0	1
480	237	77	0	0	1
481	237	78	0	0	1
482	237	79	0	0	1
483	237	80	0	0	1
488	237	83	0	0	1
468	217	66	0	0	10
476	222	73	0	0	10
477	222	74	0	0	10
\.


--
-- Data for Name: catagories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.catagories (catagory_id, catagory_name, thumb_nail_image) FROM stdin;
54	Groceries	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/catagories%2F1657340312850%20-%20noodle-pasta-vermicelli-20200603.png?alt=media&token=548d8cc6-7b3d-4879-ba44-01c8a4c119de
56	Men	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/catagories%2F1657340435655%20-%20index.jpeg?alt=media&token=e15b7679-b6c9-4a51-9c49-6bb778ea8d44
57	Women	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/catagories%2F1657340461110%20-%20527.png?alt=media&token=951c063e-9258-4b84-ac4d-6b8531e81d65
58	Electronics	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/catagories%2F1657340540316%20-%20index.jpeg?alt=media&token=efcd7f7e-c85e-4c45-8ef3-6efa8ae863dd
59	Beauty	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/catagories%2F1657340642121%20-%20download%20(1).jpeg?alt=media&token=66ac9331-70e5-465a-9097-09f179b02a3a
60	Jewellery	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/catagories%2F1657340684720%20-%20download%20(2).jpeg?alt=media&token=1027c7d3-4638-4918-9727-0377bc0be743
62	daily essentials	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/catagories%2F1657691612193%20-%20toothpaste-20200520.png?alt=media&token=21772686-f50a-4b8f-98a4-cf5121616e56
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (color_id, color_name, c_product_id) FROM stdin;
415	#261094	208
416	#4e9410	208
417	#945010	208
418	#11a614	209
419	#a65f11	209
420	#40fab4	209
421	#66dce3	209
422	#331bad	210
423	#7767ca	210
424	#746d99	210
425	#bd4d13	211
426	#3013bd	211
427	#13b3bd	211
428	#5dbd13	211
429	#554a8c	212
430	#554a8c	212
431	#39269c	213
432	#39269c	213
435	#4933b7	215
436	#4933b7	215
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_id, name, email, active) FROM stdin;
1	IBM	contact@ibm.com	t
3	Intel	contact@intel.com	t
2	Microsoft	hotline@microsoft.com;hotline@microsoft.com;contact@microsoft.com	t
\.


--
-- Data for Name: order_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_data (order_data_id, o_product_id, o_order_id, o_no_of_product, o_c_color_id, o_c_size_id, product_price) FROM stdin;
60	237	52	1	0	0	500
61	237	53	1	0	394	500
62	220	54	4	0	0	500
63	210	54	1	422	369	333
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, o_user_id, order_flag, price, rp_transactionid, razorpay_order_id, created_at, o_address_id) FROM stdin;
52	1	f	500	pay_K6dhG90j72gZdP	order_K6dh1R8tDMC43n	2022-08-17T08:46:16.611Z	12
53	1	t	500	pay_K6g3hOZfRq9C6k	order_K6g3NM7bs5C4jx	2022-08-17T11:04:54.431Z	12
54	11	t	2333	pay_K6g63G2PbkVNMz	order_K6g5ZGGKKsFEbF	2022-08-17T11:07:08.220Z	16
\.


--
-- Data for Name: product_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_image (product_image_id, p_product_id, image_name) FROM stdin;
182	208	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657361872110%20-%20t-base-half-sleeve-cotton-stretch-printed-cut-sew-crew-neck-t-shirt-for-men-navy-product-images-rvtho0mwlq-1-202206170042.jpg?alt=media&token=bc0481a9-21ba-4dfb-bb66-10dff387e3db
183	208	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657361872109%20-%20t-base-half-sleeve-cotton-stretch-printed-cut-sew-crew-neck-t-shirt-for-men-navy-product-images-rvtho0mwlq-2-202206170042.jpg?alt=media&token=4f0c4475-60f8-41c6-afa2-656d7e167019
184	208	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657361872110%20-%20t-base-half-sleeve-cotton-stretch-printed-cut-sew-crew-neck-t-shirt-for-men-navy-product-images-rvtho0mwlq-0-202206170042.jpg?alt=media&token=d256b143-ddec-44dd-b15d-d75f99d74f1c
185	208	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657361872106%20-%20t-base-half-sleeve-cotton-stretch-printed-cut-sew-crew-neck-t-shirt-for-men-navy-product-images-rvtho0mwlq-3-202206170042.jpg?alt=media&token=d39ad26c-1b29-4069-8796-9f8c0e340d75
186	209	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657364017207%20-%2018-men-light-blue-denim-casual-shirts-xxl-product-images-rvhmdck1cp-1-202206012038.jpg?alt=media&token=f5c04b21-b6fd-4c69-b87a-c628acb2f57f
187	209	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657364017206%20-%2018-men-light-blue-denim-casual-shirts-xxl-product-images-rvhmdck1cp-2-202206012038.jpg?alt=media&token=68d84387-feb9-422e-ba18-b79e74a83408
188	209	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657364017207%20-%2018-men-light-blue-denim-casual-shirts-xxl-product-images-rvhmdck1cp-0-202206012038.jpg?alt=media&token=75083b48-fdf7-4c98-8cfb-d5cd6596e8dc
189	209	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657364017204%20-%2018-men-light-blue-denim-casual-shirts-xxl-product-images-rvhmdck1cp-3-202206012038.jpg?alt=media&token=aec1e2ce-5817-4b6b-b42a-e50d71f446bc
190	210	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623181102%20-%20try-this-men-blue-striped-cotton-t-shirt-product-images-rvqcxbjt9m-1-202202271448.jpg?alt=media&token=2bf3873e-c83f-416c-9c6e-71b4971fb0d7
191	210	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623181103%20-%20try-this-men-blue-striped-cotton-t-shirt-product-images-rvqcxbjt9m-0-202202271447.jpg?alt=media&token=8c007a22-2228-415c-9032-797859925846
192	210	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623181099%20-%20try-this-men-blue-striped-cotton-t-shirt-product-images-rvqcxbjt9m-0-202202271447%20(1).jpg?alt=media&token=8d9288c8-eb63-4521-afd2-244d12c744e1
193	211	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623181099%20-%20try-this-men-blue-striped-cotton-t-shirt-product-images-rvqcxbjt9m-0-202202271447%20(1).jpg?alt=media&token=8d9288c8-eb63-4521-afd2-244d12c744e1
194	211	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623262594%20-%20geum-men-mustard-black-solid-cotton-blend-hooded-neck-t-shirt-pack-of-1-product-images-rvdn3lqv6d-2-202205310522.jpg?alt=media&token=4e2a2c6d-20c6-42c8-bae9-bcad4dc8a79b
195	211	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623181102%20-%20try-this-men-blue-striped-cotton-t-shirt-product-images-rvqcxbjt9m-1-202202271448.jpg?alt=media&token=2bf3873e-c83f-416c-9c6e-71b4971fb0d7
196	211	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623181103%20-%20try-this-men-blue-striped-cotton-t-shirt-product-images-rvqcxbjt9m-0-202202271447.jpg?alt=media&token=8c007a22-2228-415c-9032-797859925846
197	212	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623456763%20-%20smartees-men-multicolor-solid-cotton-blend-single-round-neck-t-shirt-product-images-rvjx0cye8u-1-202202261927.jpg?alt=media&token=cad8aa81-414f-499e-a836-1b52439326d1
198	212	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623456759%20-%20smartees-men-multicolor-solid-cotton-blend-single-round-neck-t-shirt-product-images-rvjx0cye8u-3-202202261928.jpg?alt=media&token=6b9577eb-e238-43ad-914e-0803b6c1bf81
199	212	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623456764%20-%20smartees-men-multicolor-solid-cotton-blend-single-round-neck-t-shirt-product-images-rvjx0cye8u-0-202202261926.jpg?alt=media&token=0b5896cb-d202-4d73-b2a7-8e16925cf584
200	213	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623640749%20-%20try-this-men-polo-neck-cotton-t-shirt-product-images-rvzu5fwznf-1-202205171950.jpg?alt=media&token=6f109e3c-0cef-4e91-a480-27b59b2c1678
201	213	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623640752%20-%20try-this-men-polo-neck-cotton-t-shirt-product-images-rvzu5fwznf-0-202205171950.jpg?alt=media&token=82ac962f-583e-40fe-84e3-5dfccc444219
202	215	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657623868153%20-%20royal-brillier-printed-men-round-neck-multicolor-t-shirt-blue-and-multicolor-pack-of-2-s-product-images-rvlkpu9wku-0-202207060339.jpg?alt=media&token=207e0f6d-6a9e-4376-802e-83e6651b94e9
203	216	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657706901108%20-%20sweet-corn-1-pc-approx-250-g-450-g-product-images-o590001266-p590001266-0-202203170359.jpg?alt=media&token=adaa7703-3c55-4982-9aed-d78613aa5801
204	217	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707046874%20-%20watermelon-kiran-1-pc-approx-2300-g-3000-g-product-images-o590001265-p590041413-0-202203142036.jpg?alt=media&token=0acf9315-e0ad-4aec-aa21-4f4203ec2998
205	218	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707135462%20-%20onion-5-kg-pack-product-images-o590002136-p590002136-0-202203141906.jpg?alt=media&token=e5714217-c039-4515-ab06-a4b0f7b086ef
206	219	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707240597%20-%20coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202203170206.jpg?alt=media&token=4ca417d4-2027-4da0-8641-c5ddbb139436
207	220	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707290179%20-%20button-mushroom-200-g-product-images-o590000245-p590000245-0-202203151749.jpg?alt=media&token=07457a8a-cdf9-4100-8bed-b07044d30c88
208	221	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707396393%20-%20plum-indian-8-pcs-pack-approx-350-g-400-g-product-images-o590003511-p590318013-0-202203170215.jpg?alt=media&token=bc544284-0f85-4869-84df-b9bba6a84cdd
209	222	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707510639%20-%20plum-indian-8-pcs-pack-approx-350-g-400-g-product-images-o590003511-p590318013-0-202203170215%20(1).jpg?alt=media&token=edd0263c-8e14-4753-9ffa-97292bcfd5cb
210	223	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707595940%20-%20papaya-each-approx-800-g-1600-g-product-images-o590001247-p590001247-0-202203170247.jpg?alt=media&token=6dd36bc2-7c9b-4138-aabc-004945a6db38
211	224	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707635260%20-%20fresh-dates-pack-approx-450-g-500-g-product-images-o590003241-p590333050-0-202203151737.jpg?alt=media&token=530f5291-ad49-49f8-8a37-ca6d8679bddc
212	225	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707713362%20-%20mango-langda-4-pcs-approx-800-g-1000-g-product-images-o590009522-p590261202-0-202206301407.jpg?alt=media&token=f881f993-8747-46e2-9262-4cec5e2307aa
213	226	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657707956516%20-%20pomegranate-economy-6-pcs-pack-product-images-o590001268-p590485022-0-202203150746.jpg?alt=media&token=7b9923fa-5405-4c2f-8182-2d0bd8d0b6e9
214	227	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708107819%20-%20maaza-mango-drink-1-2-l-bottle-product-images-o490001795-p490001795-1-202203171010.jpg?alt=media&token=447f3492-35fa-45d4-87e5-b5b0c71f38f4
215	227	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708107822%20-%20maaza-mango-drink-1-2-l-bottle-product-images-o490001795-p490001795-0-202203171010.jpg?alt=media&token=f2721141-4c1c-42f6-8fd7-f2a2fdd1001a
216	228	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708157202%20-%20sprite-600-ml-product-images-o490001800-p490001800-1-202203170616.jpg?alt=media&token=0214554f-cd6c-4597-aa65-f3446073f5b9
217	228	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708157204%20-%20sprite-600-ml-product-images-o490001800-p490001800-0-202203170616.jpg?alt=media&token=1982c3fd-ef12-4d4a-a86b-092a8253a416
218	229	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708215497%20-%20pepsi-2-l-product-images-o490004176-p490004176-0-202203170742.jpg?alt=media&token=48006c20-f6bb-4a28-acfe-6ff5166e41b3
219	229	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708215494%20-%20pepsi-2-l-product-images-o490004176-p490004176-1-202203170742.jpg?alt=media&token=cdd3b5c1-2ebe-4671-8e09-85a4856c3979
220	230	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708352989%20-%20yeah-mango-drink-1-l-product-images-o490521803-p490521803-0-202203170328.jpg?alt=media&token=a6d5490b-7ac8-449e-81c5-be0a338220bf
221	230	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708352991%20-%20yeah-mango-drink-1-l-product-images-o490521803-p490521803-2-202203170328.jpg?alt=media&token=6393f9ce-befa-4bc5-a077-77dac45bf819
222	231	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708432348%20-%20mirinda-orange-2-25-l-product-images-o490004177-p490004177-0-202203151914.jpg?alt=media&token=8162f7d9-62b1-4898-bc7a-29d682f956a2
223	232	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708491949%20-%207up-2-5-l-product-images-o490005200-p490005200-0-202206101526.jpg?alt=media&token=feb00143-32e0-4404-84d7-2e9e3198b497
224	233	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708529213%20-%20bisleri-soda-750-ml-product-images-o491552148-p491552148-0-202203171029.jpg?alt=media&token=f04f0dbf-42cd-4584-8adf-9c76f53e88bd
225	234	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708612060%20-%20kinley-soda-750-ml-product-images-o491071103-p491071103-0-202203150326.jpg?alt=media&token=780999f1-e8b8-4481-ae38-e5ec697a4ae3
226	235	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708665644%20-%20tata-gold-leaf-tea-500-g-product-images-o490001341-p490001341-0-202203170442.jpg?alt=media&token=35be3b8d-baeb-4147-9e98-7abca6ffbddd
227	236	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708710639%20-%20real-fruit-power-mixed-fruit-juice-1-l-product-images-o490001987-p490001987-0-202203170837.jpg?alt=media&token=7e7048de-20bf-4dcf-83b9-72ed1c2be096
228	236	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708710636%20-%20real-fruit-power-mixed-fruit-juice-1-l-product-images-o490001987-p490001987-1-202203170837.jpg?alt=media&token=6cf6c5e0-2503-4bcd-a678-270a923286f7
229	237	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708811726%20-%20tur-arhar-dal-2-kg-product-images-o491417390-p491417390-0-202203170610.jpg?alt=media&token=201ebcae-747c-4cbd-b7de-73c13d934529
230	237	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708811723%20-%20tur-arhar-dal-2-kg-product-images-o491417390-p491417390-1-202203170610.jpg?alt=media&token=5c017387-c79c-44f5-8b60-3a7bd460c143
231	238	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708866866%20-%20tata-sampann-high-protein-unpolished-tur-arhar-dal-1-kg-product-images-o490830932-p490830932-1-202203170730.jpg?alt=media&token=14687728-cd5a-4448-b9e8-f5cbbdec3b52
232	238	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708866870%20-%20tata-sampann-high-protein-unpolished-tur-arhar-dal-1-kg-product-images-o490830932-p490830932-0-202203170730.jpg?alt=media&token=7c0263a9-5ee4-47fd-ba5a-8be04d6f44bc
233	239	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708933409%20-%20rentio-premium-deshi-oiled-tur-arhar-dal-5-kg-product-images-o490067726-p490067726-1-202205172245.jpg?alt=media&token=9c9e89b6-716b-4d46-9bcf-df5f2958bbb9
234	239	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708933412%20-%20rentio-premium-deshi-oiled-tur-arhar-dal-5-kg-product-images-o490067726-p490067726-0-202205172245.jpg?alt=media&token=ca059e9d-8e45-48e3-bb8a-52e1ef5b9941
235	240	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708985354%20-%20rentio-premium-deshi-oiled-tur-arhar-dal-5-kg-product-images-o490067726-p490067726-0-202205172245.jpg?alt=media&token=f905d7f2-8887-4dfd-80b1-9cf6136ced47
236	240	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657708985352%20-%20rentio-premium-deshi-oiled-tur-arhar-dal-5-kg-product-images-o490067726-p490067726-1-202205172245.jpg?alt=media&token=9563ca44-39cf-4bc6-9639-b3a3eefb387b
237	241	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709013563%20-%20wagh-bakri-premium-leaf-tea-500-g-product-images-o490073715-p490073715-0-202203141828.jpg?alt=media&token=30e5c6c8-fa9b-46a1-a2d4-a034679fe01e
238	242	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709060339%20-%20gulab-filtered-groundnut-oil-5-l-product-images-o490022513-p490022513-0-202206301905.jpg?alt=media&token=2cbb9073-ee9c-4f4f-81a5-81c198218e22
239	242	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709060336%20-%20gulab-filtered-groundnut-oil-5-l-product-images-o490022513-p490022513-1-202206301905.jpg?alt=media&token=25038c45-219e-4420-aa0e-52d7b8659856
240	243	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709204724%20-%20good-life-tur-dal-1-kg-product-images-o491187264-p491187264-2-202203170912.jpg?alt=media&token=7b7f2ed1-7cb3-447f-9ea8-7ed27239a5b4
241	243	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709204726%20-%20good-life-tur-dal-1-kg-product-images-o491187264-p491187264-0-202203170912.jpg?alt=media&token=ee530b27-a1ff-4c8b-9103-9910f64539f1
242	244	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709274285%20-%20pro-nature-organic-raw-peanuts-500-g-product-images-o491092292-p491092292-2-202203170355.jpg?alt=media&token=cbae1160-f69d-4b41-b87b-ff45111ba409
243	244	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709274288%20-%20pro-nature-organic-raw-peanuts-500-g-product-images-o491092292-p491092292-0-202203170355.jpg?alt=media&token=519980fa-375b-4023-8383-5bf1a5f618e3
244	245	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709371651%20-%20pro-nature-organic-unpolished-tur-arhar-dal-1-kg-product-images-o490375696-p490375696-2-202207072122.jpg?alt=media&token=c6d32f46-2855-408f-a4cc-d8b22bd2793d
245	245	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709371654%20-%20pro-nature-organic-unpolished-tur-arhar-dal-1-kg-product-images-o490375696-p490375696-0-202207072122.jpg?alt=media&token=e8d622ac-977f-4873-86f4-a82c51e85941
246	246	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709596560%20-%20aashirvaad-nature-s-super-foods-organic-arhar-tur-dal-1-kg-product-images-o491696851-p590126471-1-202203171144.jpg?alt=media&token=7dedd9ee-3113-4494-a374-84ab9a08d0b9
247	246	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709596563%20-%20aashirvaad-nature-s-super-foods-organic-arhar-tur-dal-1-kg-product-images-o491696851-p590126471-0-202203171144.jpg?alt=media&token=0344642c-5231-42c1-9c61-d401ea98a429
248	247	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709747373%20-%20sunfeast-dark-fantasy-choco-fills-cookies-75-g-product-images-o490762566-p490762566-1-202206071739.jpg?alt=media&token=54d9a75c-7f8e-4afa-9a21-807c82d90dcc
249	248	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709812719%20-%20parle-platina-nutricrunch-digestive-cookies-1-kg-product-images-o491641992-p590309503-1-202203151738.jpg?alt=media&token=eeddc5de-9936-42b3-86ca-5526acdf18b4
250	248	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709812716%20-%20parle-platina-nutricrunch-digestive-cookies-1-kg-legal-images-o491641992-p590309503-2-202203151738.jpg?alt=media&token=a9c214e9-1bcf-4a80-91c7-457f29a62709
251	248	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709812720%20-%20parle-platina-nutricrunch-digestive-cookies-1-kg-product-images-o491641992-p590309503-0-202203151738.jpg?alt=media&token=65723dbe-b0ba-43a3-aec2-a15f6728a3fa
252	249	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709905315%20-%20cadbury-oreo-original-vanilla-creme-biscuits-300-g-product-images-o491390292-p491390292-3-202203170638.jpg?alt=media&token=9244d0a3-5fd0-45ac-a697-c4fd473a2c84
253	249	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709905318%20-%20cadbury-oreo-original-vanilla-creme-biscuits-300-g-product-images-o491390292-p491390292-0-202203170638.jpg?alt=media&token=f4585128-1134-4f7b-bb34-38df4b3ab548
254	250	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709944335%20-%20parle-20-20-gold-cashew-almond-cookies-1-kg-product-images-o491984653-p590441792-0-202203150241.jpg?alt=media&token=9800814c-8aed-4d2f-a9c0-7b6993e5a7ef
255	250	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709944332%20-%20parle-20-20-gold-cashew-almond-cookies-1-kg-product-images-o491984653-p590441792-1-202203150241.jpg?alt=media&token=b0374c9b-a816-43aa-95a2-fd03ea9eef58
256	251	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709996209%20-%20britannia-good-day-cashew-cookies-600-g-product-images-o491161888-p491161888-1-202203170250.jpg?alt=media&token=ea2ebdf4-7b57-4198-8d38-9450b3765692
257	251	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657709996212%20-%20britannia-good-day-cashew-cookies-600-g-product-images-o491161888-p491161888-0-202203170250.jpg?alt=media&token=bedd7b12-e0e4-4efd-a3cc-98b42e38040e
258	252	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710121615%20-%20unibic-choco-chip-cookies-500-g-product-images-o491502843-p491502843-0-202203170513.jpg?alt=media&token=80a156b5-da83-4076-a8eb-004af61b79db
259	253	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710186622%20-%20palekar-classic-choco-nankatai-200-g-product-images-o491984367-p590157017-0-202203160345.jpg?alt=media&token=ebbedc99-4c54-4485-9345-296427388798
260	254	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710237516%20-%20unibic-cashew-badam-cookies-500-g-product-images-o491585579-p590141638-1-202203150750.jpg?alt=media&token=319f1716-5da2-47e1-8b58-0e59bb9f7c54
261	254	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710237518%20-%20unibic-cashew-badam-cookies-500-g-product-images-o491585579-p590141638-0-202203150750.jpg?alt=media&token=09a110ec-991c-4a2d-a7fd-ebc11a35c107
262	255	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710347421%20-%20unibic-cashew-badam-cookies-500-g-product-images-o491585579-p590141638-1-202203150750.jpg?alt=media&token=d45fa49f-efc7-487a-b6c9-6bd9daa05ec5
263	255	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710347424%20-%20unibic-cashew-badam-cookies-500-g-product-images-o491585579-p590141638-0-202203150750.jpg?alt=media&token=ad681586-0d3d-4dea-be26-c326f9229a5a
264	256	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710459795%20-%20good-life-sugar-m-1-kg-product-images-o491551493-p491551493-0-202204281542.jpg?alt=media&token=db1d918c-26df-4c75-830b-6ddf1dcfe48f
265	256	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710459792%20-%20good-life-sugar-m-1-kg-product-images-o491551493-p491551493-1-202204281542.jpg?alt=media&token=c9048790-ae83-4de6-b4a1-24546cf3c8ca
266	257	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710537161%20-%20kissan-fresh-tomato-ketchup-1-2-kg-product-images-o492391349-p590809928-0-202203150627.jpg?alt=media&token=f586233b-51a8-4a87-8b91-c082ada3866d
267	257	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710537158%20-%20kissan-fresh-tomato-ketchup-1-2-kg-product-images-o492391349-p590809928-2-202203150627.jpg?alt=media&token=6d11b139-e78d-466c-9c88-fcb3b4a6479c
268	257	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1657710537160%20-%20kissan-fresh-tomato-ketchup-1-2-kg-product-images-o492391349-p590809928-1-202203150627.jpg?alt=media&token=87488592-5915-4be2-ac59-d829b195b8aa
425	328	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1660732477035%20-%20angur-oily-toor-dal-5-kg-product-images-o490675805-p490675805-1-202205172245.jpg?alt=media&token=865b3fcf-ffeb-46c6-9d62-91efe355bcd6
426	328	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/products%2F1660732477038%20-%20angur-oily-toor-dal-5-kg-product-images-o490675805-p490675805-0-202205172245.jpg?alt=media&token=8f95de29-01e7-474b-9e16-b54d2d615547
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, p_sub_catagory_id, product_name, price, discount, top_deals, final_price) FROM stdin;
212	29	Smartees Men Multicolor Solid Cotton Blend Single Round Neck T-shirt	10000	0	f	10000
208	29	T-shirt	1000	0	f	1000
209	29	18+ Men Light Blue Denim Casual Shirts 	10000	0	f	10000
210	29	TRY THIS MEN BLUE STRIPED COTTON T-SHIRT	333	0	f	333
213	29	TRY THIS MEN POLO NECK COTTON T-SHIRT	10000	0	f	10000
211	29	Geum Men Red Solid Cotton Blend Hooded Neck T-shirt (Pack of 1)	10000	0	f	10000
215	29	ROYAL BRILLIER Printed Men Round 	100	0	f	100
216	25	Sweet Corn 1 pc (Approx 250 g - 450 g)	16	0	f	16
217	25	Watermelon Kiran Big 1 pc (Approx. 2800 g - 4000 g)	50	0	f	50
218	25	Onion 5 kg (Pack)	1000	0	f	1000
219	25	Coconut 1 pc (Approx 350 g - 600 g)	100	0	f	100
220	25	Button Mushroom 200 g	500	0	f	500
221	25	Pear Green Indian 6 pcs (Approx 700 g - 1000 g)	100	0	f	100
222	25	Plum Indian 8 pcs (Approx. 350 g - 400 g)	1000	0	f	1000
223	25	Papaya (Each) (Approx. 800 g - 1600 g)	500	0	f	500
224	25	Fresh Dates (Pack) (Approx 450 g - 500 g)	200	0	f	200
225	25	Mango Langda 4 pcs (Approx 800 g - 1000 g)	200	0	f	200
226	25	Pear Green Indian 6 pcs (Approx 700 g - 1000 g)	150	0	f	150
227	27	Maaza Mango Drink 1.2 L	50	0	f	50
228	27	Sprite 600 ml	500	0	f	500
229	27	Pepsi 2 L	500	0	f	500
230	27	Yeah Mango Drink 1 L	150	0	f	150
231	27	Mirinda Orange 2.25 L	70	0	f	70
232	27	7Up 2.5 L	50	0	f	50
233	27	7Up 2.5 L	50	0	f	50
234	27	7Up 2.5 L	100	0	f	100
235	27	Kinley Soda 750 ml	100	0	f	100
236	27	Real Fruit Power Mixed Fruit Juice 1 L	500	0	f	500
237	35	Real Fruit Power Mixed Fruit Juice 1 L	500	0	f	500
328	35	Angur Oily Toor Dal 5 kg	556	7	f	518
238	35	Tata Sampann Unpolished Tur / Arhar Dal 1 kg	550	0	f	550
239	35	Rentio Premium Deshi Oiled Tur / Arhar Dal 5 kg	1000	0	f	1000
240	35	Rentio Premium Deshi Oiled Toor Dal 1 kg	1000	0	f	1000
241	35	Rentio Premium Deshi Oiled Toor Dal 1 kg	47	0	f	47
242	35	Gulab Filtered Groundnut Oil 5 L	400	0	f	400
243	35	Good Life Tur Dal 1 kg	550	0	f	550
244	35	Pro Nature Organic Raw Peanuts 500 g	657	0	f	657
245	35	Pro Nature Organic Unpolished Tur / Arhar Dal 1 kg	231	0	f	231
246	35	Aashirvaad Nature Super Foods Organic Arhar / Tur Dal 1 kg	1000	0	f	1000
247	26	Sunfeast Dark Fantasy Choco Fills Cookies 75 g	100	0	f	100
248	26	Parle Platina Nutricrunch Digestive Cookies 1 kg	250	0	f	250
249	26	Cadbury Oreo Original Vanilla Creme Biscuits 300 g	350	0	f	350
250	26	Parle 20-20 Gold Cashew Almond Cookies 1 kg	2000	0	f	2000
251	26	Britannia Good Day Cashew Cookies 600 g	250	0	f	250
252	26	Unibic Choco Chip Cookies 500 g	1000	0	f	1000
253	26	Palekar Classic Choco Nankatai 200 g	45	0	f	45
254	35	Unibic Cashew Badam Cookies 500 g	550	0	f	550
255	26	Unibic Cashew Badam Cookies 500 g	1000	0	f	1000
256	26	Good Life Sugar (M) 1 kg	1000	0	f	1000
257	26	Kissan Fresh Tomato Ketchup 1.2 kg5	156	9	f	142
\.


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sizes (size_id, available_size, s_product_id) FROM stdin;
357	xxs	208
358	xs	208
359	xl	208
360	l	208
361	9	209
362	7	209
363	6	209
364	10	209
365	30	209
366	32	209
367	28	209
368	26	209
369	xs	210
370	l	210
371	xl	210
372	xxs	211
373	xs	211
374	l	211
375	xl	211
376	xxs	212
377	xl	212
378	xs	212
379	l	212
380	xxs	213
381	xs	213
382	xl	213
383	l	213
385	xs	215
386	xxs	215
388	200	216
389	400	216
390	300	216
391	2	229
392	1	230
393	2	231
394	1	237
395	5	239
396	1	240
397	3	240
398	2	240
399	1	256
\.


--
-- Data for Name: sub_catagories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_catagories (sub_catagory_id, sub_catagory_name, sc_image, sc_catagory_id) FROM stdin;
36	Atta , Flours  & sooji	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691707996%20-%200-14.png?alt=media&token=72bd4e8a-5f18-4288-a87a-9382bdf31547	62
37	Edible Oils	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691732946%20-%200-18.png?alt=media&token=30715b12-d5d6-49c7-84aa-56822faad712	62
38	Salt,sugar and Jaggery	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691845659%20-%200-20.png?alt=media&token=34e4409b-4a6b-4000-be26-872187dd268e	62
39	Bath and HandWash	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691865401%20-%20bath-hand-wash-20200714.png?alt=media&token=28d601cc-0ff9-44ea-9d7c-d79476369ad6	62
40	ToothPaste	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691881882%20-%20toothpaste-20200520.png?alt=media&token=6ade1d45-c4f4-4ea6-96c6-2a4e622bef1e	62
25	Fruits & Vagitables	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657340801087%20-%20fruits-vegetables-20200520.png?alt=media&token=cff36df4-84cd-4fbc-a5d6-dece6cd95dbb	54
26	Daily and Backery	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657340838607%20-%201657109179_1654018570_Snacks-FOOD.jpg?alt=media&token=59fdfda4-950d-4e08-ad82-8db4e4fe821a	54
27	Bavarage	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657340867775%20-%201657109088_1654018530_Beverage-Corner.jpg?alt=media&token=a87af3cd-15fb-4c60-8d59-20014309ac68	54
28	Staples	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657340934247%20-%20good-life-sugar-m-1-kg-product-images-o491551493-p491551493-0-202204281542.jpg?alt=media&token=cc110076-aaef-4b78-ab01-e3da0af37c9e	54
42	Noodles , pasta	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691911208%20-%20noodle-pasta-vermicelli-20200603.png?alt=media&token=509b5c21-ed9a-40a2-9680-0b8758b2dfc6	62
43	Buiscuit & Cookies	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691946535%20-%200-44.png?alt=media&token=a14d1c6e-3a19-467c-861f-6489004d4f33	62
44	T-shits	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657701769913%20-%20527.png?alt=media&token=42542477-7084-44bd-b804-6f4097a46593	57
45	Kurtas	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657701797912%20-%20579.png?alt=media&token=e22a9da5-e7a5-4d0d-bb39-7196fc53e0c4	57
46	Jeans	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657701817480%20-%20511.png?alt=media&token=de9cd498-f768-4b55-81a6-bbd92ee8e7c3	57
47	Laggings	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657701835608%20-%20525.png?alt=media&token=3b573606-e8ba-4cd9-8358-0d277df05e30	57
48	Track Pants	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657701859183%20-%20530.png?alt=media&token=8c665f10-921e-4154-a15e-867d77cc88de	57
49	Shirts	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657701873255%20-%20572.png?alt=media&token=596afee3-3953-428c-b2b0-2bc206689ac2	57
50	Tops	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657701889455%20-%20578.png?alt=media&token=c5db02c4-7e19-479c-a736-26a0fce34f8e	57
34	T-shirt	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657703927450%20-%20509.png?alt=media&token=fd46c514-0c31-423a-b53e-1e2b5e653c2f	56
29	Shorts	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657703945562%20-%20508.png?alt=media&token=aa38de45-0a4d-484e-ac12-faea935c842b	56
30	Track Pants	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657703968409%20-%20516.png?alt=media&token=0d924fd0-8e85-4436-b5b6-f7cbea479105	56
31	Jeans	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657703985457%20-%20562.png?alt=media&token=eecef690-7fa8-4ac0-8612-574fd74a05ea	56
32	Shirts	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657704002216%20-%20515.png?alt=media&token=f18e7c6a-75b1-42b2-943c-4c2eeafb02b2	56
33	Trousers	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657704019088%20-%20505.png?alt=media&token=cc9b2cc3-8479-435c-a4ef-f639f6bd15b6	56
51	Boxer	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657704034080%20-%20592.png?alt=media&token=a4699682-173a-4504-80a9-dc88b9e2ae9f	56
35	Dals & Pulse	https://firebasestorage.googleapis.com/v0/b/e-commerce-dbddf.appspot.com/o/subCatagories%2F1657691658965%20-%20dals-pulses-20200714.png?alt=media&token=e5378046-0733-4792-8002-6a12a94ede41	62
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, first_name, last_name, email, password, phone_number) FROM stdin;
1	nirali	diyora	nirali@gmail.com	$2a$10$ndBOlVQRg7OtaCGzRlS7/uqaE4ykrw/fZR0BANvsVCHkvlAjp4wGG	9016163116
2	nirali	diyora	nirali1@gmail.com	$2a$10$tuUPZovDq.vCaLthCnykeOO7EeJ.UNRKSMvq6LhxJkcDZSqalXTuC	9016163116
3	nirali	diyora	nirali2@gmail.com	$2a$10$Oukvg9EhJufnKekZ9X8bNO5KhZc0rTFtxhZB069EOPkZoQEEpESnK	9016163116
4	nirali	diyora	nirali3@gmail.com	$2a$10$K/R2GOJKZaAxUvDkhb4Ieuxj0katU2JTnpHZU0LOu7f5EgH0jt/LO	9016163116
5	nirali	diyora	nirali4@gmail.com	$2a$10$bJ6gHzm6TTBn4GPmBm4fset/JqjkZ.kIQV6E60FFjU9vMbU41Q.Si	9016163116
6	any	any	any	$2a$10$eWfz5QPaQbIUctzSz62qfeItH2KjRZJJy6rZWRY9f71nvnyEUX7CS	nirali@gmail.com
7	any	any	nirali5@gmail.com	$2a$10$MGjWaW/36Rq1ahEyuZGtqOQGmKJQ4Q9jNpVKPHDkpJ2jv1oJSnK42	any
8	ghhgggg	ggg	gggg	$2a$10$sBgxV2sRhWEI3DVCtEQpa.Bc137dMw40lYA7A/RKFRH9i5hQ2m/L.	gggg
10	rushit	jivani	rjivani@gmail.com	$2a$10$/7mfq1jwA9WU95lwph/weeJzhO0BvwPo55dBJ78f4opNTSG.JU2MG	1335577889
11	Nirali	Diyora	1234@gmail.com	$2a$10$a3eqI/jwQFR.XSd815nbEeUvO26aMaOqZmLzyi13wq3OiKw5EEFd2	1224455767
12	Nirali	Diyora	nirali@gmail.comf	$2a$10$K9mIdPo4iInIjbmxnl7B6OgqDujEHFMUZa8SVsZb8ZA0lCmBqbjUq	1224455767
13	Nirali	Diyora	test.react3151@gmail.com	$2a$10$IymPx0nrOj5d3E.X7V3RRuSoRjIuWRIYoA0ZnBU0ZBnAPXUzXQDx2	1224455767
14	Nirali	Diyora	rushit@gmail.com	$2a$10$KqY/7nc74kpgaCZMBgOhMOMsw6S2dSqhV6Y3sryhLz2IetdZAg2.S	1224455767
\.


--
-- Name: address_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_address_id_seq', 16, true);


--
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_cart_id_seq', 100, true);


--
-- Name: cart_data_cart_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_data_cart_data_id_seq', 585, true);


--
-- Name: catagory_catagory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.catagory_catagory_id_seq', 78, true);


--
-- Name: colors_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colors_color_id_seq', 499, true);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 7, true);


--
-- Name: order_data_order_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_data_order_data_id_seq', 63, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 54, true);


--
-- Name: product_image_product_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_image_product_image_id_seq', 426, true);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_product_id_seq', 328, true);


--
-- Name: sizes_size_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sizes_size_id_seq', 524, true);


--
-- Name: sub_catagory_sub_catagory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_catagory_sub_catagory_id_seq', 60, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_user_id_seq', 14, true);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (address_id);


--
-- Name: cart_data cart_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_data
    ADD CONSTRAINT cart_data_pkey PRIMARY KEY (cart_data_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


--
-- Name: catagories catagory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catagories
    ADD CONSTRAINT catagory_pkey PRIMARY KEY (catagory_id);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (color_id);


--
-- Name: customers customers_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_name_key UNIQUE (name);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: order_data order_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_data
    ADD CONSTRAINT order_data_pkey PRIMARY KEY (order_data_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: product_image product_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image
    ADD CONSTRAINT product_image_pkey PRIMARY KEY (product_image_id);


--
-- Name: products product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- Name: sizes sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (size_id);


--
-- Name: sub_catagories sub_catagory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_catagories
    ADD CONSTRAINT sub_catagory_pkey PRIMARY KEY (sub_catagory_id);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: fki_0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_0 ON public.order_data USING btree (o_order_id);


--
-- Name: fki_a_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_a_user_id ON public.address USING btree (a_user_id);


--
-- Name: fki_c_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_c_cart_id ON public.cart_data USING btree (c_cart_id);


--
-- Name: fki_c_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_c_user_id ON public.cart USING btree (c_user_id);


--
-- Name: fki_o_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_o_user_id ON public.orders USING btree (o_user_id);


--
-- Name: fki_p_product_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_p_product_id ON public.product_image USING btree (p_product_id);


--
-- Name: fki_p_sub_catagory_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_p_sub_catagory_id ON public.products USING btree (p_sub_catagory_id);


--
-- Name: fki_s_product_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_s_product_id ON public.sizes USING btree (s_product_id);


--
-- Name: fki_sc_catagory_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_sc_catagory_id ON public.sub_catagories USING btree (sc_catagory_id);


--
-- Name: address a_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT a_user_id FOREIGN KEY (a_user_id) REFERENCES public.users(user_id) NOT VALID;


--
-- Name: cart_data c_cart_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_data
    ADD CONSTRAINT c_cart_id FOREIGN KEY (c_cart_id) REFERENCES public.cart(cart_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: colors c_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT c_product_id FOREIGN KEY (c_product_id) REFERENCES public.products(product_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: order_data o_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_data
    ADD CONSTRAINT o_order_id FOREIGN KEY (o_order_id) REFERENCES public.orders(order_id) NOT VALID;


--
-- Name: orders o_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT o_user_id FOREIGN KEY (o_user_id) REFERENCES public.users(user_id) NOT VALID;


--
-- Name: product_image p_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image
    ADD CONSTRAINT p_product_id FOREIGN KEY (p_product_id) REFERENCES public.products(product_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: products p_sub_catagory_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT p_sub_catagory_id FOREIGN KEY (p_sub_catagory_id) REFERENCES public.sub_catagories(sub_catagory_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: sizes s_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT s_product_id FOREIGN KEY (s_product_id) REFERENCES public.products(product_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: sub_catagories sc_catagory_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_catagories
    ADD CONSTRAINT sc_catagory_id FOREIGN KEY (sc_catagory_id) REFERENCES public.catagories(catagory_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

