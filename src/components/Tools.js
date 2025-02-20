import React, { useState } from 'react';

const StudentTools = () => {
  const [activeTool, setActiveTool] = useState('kanban');

  // Kanban Board State
  const [tasks, setTasks] = useState({
    todo: [{ id: '1', content: 'Research project' }],
    inProgress: [{ id: '2', content: 'Write assignment' }],
    done: [{ id: '3', content: 'Submit project' }],
  });
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); // For popup state


  // CGPA Calculator State
  const [cgpa, setCgpa] = useState('');
  const [gradingSystem, setGradingSystem] = useState('10-point');
  const [percentage, setPercentage] = useState(null);

  

  // Lost & Found State
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '', type: 'lost' });

  // Exam Preparation Checklist State
  const [prepTasks, setPrepTasks] = useState([]);
  const [newPrepTask, setNewPrepTask] = useState({ title: '', deadline: '', priority: 'Medium', completed: false });

  // Syllabus State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [expandedCourse, setExpandedCourse] = useState(null); // For toggling course content

  // Syllabus Data (Extracted from R21 B.Tech CSE curriculum, theory courses only with module-wise content)
  const syllabusData = {
    '1': [
      {
        code: 'PH101',
        title: 'Physics-I',
        credits: 3,
        description: 'Introduction to electromagnetic theory, mechanics, oscillations, waves, and optics for engineers.',
        content: [
          { module: 'Module-1: Waves & Oscillations', hours: '6L', topics: 'Simple Harmonic Motion (Recap), superposition of waves, damped harmonic motion-over damped, critically damped and under damped motion, energy decay, logarithmic decrement, force vibration and resonance (amplitude, velocity resonance), sharpness of resonance, quality factor, related numerical problems.' },
          { module: 'Module-2: Classical Optics', hours: '13L', topics: '2.1: Interference of light-Huygens\'s principle, conditions of sustained interference, classification of interference, Newton\'s ring (qualitative descriptions of working principles and procedures-no deduction required). Engineering applications, related numerical problems. 4L\n2.2: Diffraction of light- Fresnel and Fraunhofer class, Fraunhoffer diffraction of a single slit, double slit, multiple slits, intensity distributions, missing order, Rayleigh criterion (no deduction) and resolving power of grating and microscope (no deduction), related numerical problems. 5L\n2.3: Polarization-Definition, Plane of polarization, Plane of vibration, Malus Law, Fundamental concepts of plane, circular & elliptical polarizations (only qualitative idea) with examples, Brewster\'s law, Double refraction: Ordinary & Extra ordinary rays, positive and negative crystal, Nicol\'s prism, Numerical problems. 4L' },
          { module: 'Module-3: Quantum Mechanics-I', hours: '8L', topics: '3.1: Quantum Theory- Inadequacy of classical physics-concept of quantization of energy, particle concept of electromagnetic wave (example: photoelectric and Compton Effect; no derivation required, origin of modified and unmodified lines), wave particle duality; phase velocity and group velocity; de Broglie hypothesis; Davisson and Germer experiment. 4L\n3.2: Quantum Mechanics1-Concept of wave function, physical significance of wave function, probability interpretation; normalization of wave functions; uncertainty principle, relevant numerical problems. Introduction of Schrödinger wave equation (only statement). 4L' },
          { module: 'Module-4: Solid State Physics-I', hours: '4L', topics: '4.1: Crystal Structure-Structure of solids, amorphous and crystalline solids (definition and examples), lattice, basis, unit cell, Fundamental types of lattices -Bravais lattice, simple cubic, fcc and bcc lattices, Miller indices and miller planes, co-ordination number and atomic packing factor, Bragg\'s equation, applications, numerical problems. 4L' },
          { module: 'Module-5: Modern Optics-I', hours: '8L', topics: '5.1: Laser-Concepts of various emission and absorption processes, Einstein A and B coefficients and equations, working principle of laser, metastable state, population inversion, condition necessary for active laser action, optical resonator, illustrations of Ruby laser, He-Ne laser, Semiconductor laser, applications of laser, related numerical problems. 5L\n5.2: Fibre optics-Principle and propagation of light in optical fibers (Step index, Graded index, single and multiple modes) - Numerical aperture and Acceptance angle, Basic concept of losses in optical fiber, related numerical problems. 3L' },
        ],
      },
      {
        code: 'M101',
        title: 'Mathematics-I',
        credits: 4,
        description: 'Matrix algebra, differential calculus, multivariable calculus, vector calculus, and infinite series for engineering applications.',
        content: [
          { module: 'Module 1: Matrix Algebra', hours: '11L', topics: 'Echelon form and Normal (Canonical) form of a matrix; Inverse and rank of a matrix; Consistency and inconsistency of system of linear equations, Solution of system of linear equations; Eigenvalues and eigenvectors; Diagonalization of matrices; Cayley-Hamilton theorem.' },
          { module: 'Module 2: Differential Calculus and Infinite Series', hours: '10L', topics: 'Rolle\'s Theorem, Mean value theorems, Taylor\'s and Maclaurin theorems with remainders; Concept of sequence and series, Tests for convergence of infinite series: Comparison test, D\'Alembert\'s ratio test, Raabe\'s test, Cauchy\'s root test, Leibnitz\'s Test, Power series; Taylor\'s series, Series for exponential, trigonometric and logarithm functions.' },
          { module: 'Module 3: Multivariable Calculus (Differentiation)', hours: '13L', topics: 'Function of several variables, Concept of limit, continuity and differentiability; Partial derivatives, Total derivative and its application; Chain rules, Derivatives of implicit functions Euler\'s theorem on homogeneous function, Jacobian. Maxima and minima of functions of two variables, Method of Lagrange multipliers.' },
          { module: 'Module 4: Multivariable Calculus (Integration)', hours: '6L', topics: 'Line Integral, Double Integral, Triple Integral, Change of order in multiple integrals, Change of variables in multiple integrals.' },
          { module: 'Module 5: Vector Calculus', hours: '8L', topics: 'Gradient, Directional derivatives, Divergence, Curl, vector line integrals, vector surface integrals, vector volume integrals, Green\'s theorem, Gauss divergence theorem and Stokes\' theorem.' },
        ],
      },
      {
        code: 'HSMC101',
        title: 'Professional Communication',
        credits: 2,
        description: 'Domain-specific communication skills, business communication, and cross-cultural dynamics for engineers.',
        content: [
          { module: 'Module-1: Verbal and Non-verbal Communication', hours: '4L', topics: '1.1: Definition, Relevance and Effective Usage\n1.2: Components of Verbal Communication: Written and Oral Communication\n1.3: Components of Non-verbal Communication: Kinesics, Proxemics, Chronemics, Haptics, Paralanguage\n1.4: Barriers to Effective Communication' },
          { module: 'Module-2: Social Communication Essentials and Cross-Cultural Communication', hours: '6L', topics: '2.1: Communication in Society and the Workplace\n2.2: Greetings, Courtesies and Socially Useful Language\n2.3: Cultural Contexts: High Context and Low Context Cultures\n2.4: Understanding Cultural Nuances and Stereotyping\n2.5: Achieving Culturally Neutral Communication in Speech and Writing' },
          { module: 'Module-3: Meetings', hours: '4L', topics: '3.1: Meetings: Nature and Types\n3.2: Conducting Meetings: Organization and Procedures\n3.3: Meeting Coordination: Roles of Chairpersons and Members\n3.4: Notice and Agenda for a Meeting\n3.5: Preparing the Minutes of a Meeting (MOM)' },
          { module: 'Module-4: Report Writing', hours: '4L', topics: '4.1: Nature and Function of Reports\n4.2: Types of Reports\n4.3: Researching for a Business Report\n4.4: Format, Language and Style\n4.5: Report Documentation' },
          { module: 'Module-5: Employment Communication', hours: '6L', topics: '5.1: Writing Business Letters- (Enquiry, Order, Sales, Complaint, Adjustment, Job Application, Offer)\n5.2: Preparing a CV or Résumé\n5.3: Creating a Digital/Online Profile - LinkedIn (Résumé/Video Profile)\n5.4: Writing E-mails: types, convention, and etiquette\n5.5: Memo, Notices and Circulars\n5.6: Writing Technicalities-Paragraphing, Sentence Structure and Punctuation' },
        ],
      },
    ],
    '2': [
      {
        code: 'CH201',
        title: 'Chemistry-I',
        credits: 3,
        description: 'Concepts in chemistry for engineering applications, including chemical principles and reactions.',
        content: [
          { module: 'Module-1: Chemical Thermodynamics', hours: '6L', topics: 'First Law of Thermodynamics, Enthalpy, Entropy, Gibbs Free Energy, Thermodynamic Equilibrium, Applications in Engineering.' },
          { module: 'Module-2: Electrochemistry', hours: '6L', topics: 'Electrochemical Cells, Nernst Equation, Corrosion and Its Prevention, Batteries and Fuel Cells.' },
          { module: 'Module-3: Organic Chemistry', hours: '6L', topics: 'Functional Groups, Reaction Mechanisms, Polymers and Their Applications in Engineering.' },
          { module: 'Module-4: Spectroscopy', hours: '6L', topics: 'UV-Vis, IR, NMR Spectroscopy, Applications in Material Analysis.' },
        ],
      },
      {
        code: 'M201',
        title: 'Mathematics-II',
        credits: 4,
        description: 'Advanced calculus, differential equations, and linear algebra for engineering problems.',
        content: [
          { module: 'Module-1: Differential Equations', hours: '10L', topics: 'Ordinary Differential Equations, First and Second Order, Laplace Transforms, Applications in Engineering.' },
          { module: 'Module-2: Linear Algebra', hours: '8L', topics: 'Vector Spaces, Inner Product Spaces, Eigenvalues, Applications in Systems Theory.' },
          { module: 'Module-3: Complex Analysis', hours: '8L', topics: 'Complex Functions, Cauchy-Riemann Equations, Contour Integration, Applications in Signal Processing.' },
          { module: 'Module-4: Numerical Methods', hours: '6L', topics: 'Numerical Solutions of Differential Equations, Interpolation, Root-Finding Methods.' },
        ],
      },
      {
        code: 'EE201',
        title: 'Basic Electrical Engineering',
        credits: 3,
        description: 'Fundamentals of electrical circuits, power systems, and electrical engineering principles.',
        content: [
          { module: 'Module-1: DC Circuits', hours: '6L', topics: 'Ohm’s Law, Kirchhoff’s Laws, Series and Parallel Circuits, Network Theorems.' },
          { module: 'Module-2: AC Circuits', hours: '6L', topics: 'Sinusoidal Signals, Phasors, Impedance, Power Factor, Transformers.' },
          { module: 'Module-3: Electrical Machines', hours: '6L', topics: 'DC Motors, AC Generators, Induction Motors, Basic Principles and Applications.' },
        ],
      },
      {
        code: 'CS201',
        title: 'Programming for Problem Solving',
        credits: 3,
        description: 'Introduction to programming concepts, algorithms, and problem-solving using C or similar languages.',
        content: [
          { module: 'Module-1: Introduction to Programming', hours: '6L', topics: 'Basics of C, Variables, Data Types, Operators, Control Structures.' },
          { module: 'Module-2: Functions and Arrays', hours: '6L', topics: 'Functions, Parameter Passing, Arrays, Strings, Pointers.' },
          { module: 'Module-3: Algorithms and Problem Solving', hours: '6L', topics: 'Algorithm Design, Sorting, Searching, Basic Data Structures.' },
        ],
      },
    ],
    '3': [
      {
        code: 'M301',
        title: 'Discrete Mathematics',
        credits: 3,
        description: 'Logic, sets, relations, functions, graph theory, and combinatorics for computer science.',
        content: [
          { module: 'Module 1: Set Theory', hours: '8L', topics: 'Set: Operations and Properties of set, Finite Set, Power Set, Cardinality of finite set, Cartesian Product, Relation: Types of Relations, Properties of Binary Relation, Equivalence Relation, Partial Ordering Relation and Poset, Lattice.' },
          { module: 'Module 2: Combinatorics and Counting', hours: '2L', topics: 'Sum and product rule, Permutation and Combination, Principle of Inclusion Exclusion, Pigeon Hole Principle.' },
          { module: 'Module 3: Mathematical Logic and Proof Techniques', hours: '8L', topics: 'Propositional Logic: Basics of Boolean Logic, Idea of Propositional Logic, well-formed formula, Truth tables, Tautology, Satisfiability, Contradiction, Algebra of proposition, Inference theory of Propositional Logic. Predicate Logic: Idea of First Order Predicate Logic and Quantifiers, well-formed formula of predicate, Inference theory of Predicate Logic. Proof Techniques: Some Terminology, Proof Methods and Strategies, Forward Proof, Proof by Contradiction, Proof by Contraposition, Proof of Necessity and Sufficiency.' },
          { module: 'Module 4: Theory of Numbers', hours: '4L', topics: 'Well-Ordering Principle, Divisibility theory and properties of Divisibility, Fundamental theorem of Arithmetic, Prime and Composite Numbers. Greatest Common Divisor and Euclidean Algorithm, Congruence, Residue Classes.' },
          { module: 'Module 5: Algebraic Structures', hours: '8L', topics: 'Concepts of Groups, Subgroups and Order, Cyclic Groups, Cosets, Normal Subgroups, Permutation and Symmetric groups, Group Homomorphisms. Elementary properties of Rings and related problems. Elementary properties of Fields and related problems. Elementary properties of Vector Space and related problems.' },
          { module: 'Module 6: Graph Theory', hours: '8L', topics: 'Graph Terminologies and their properties: Degree, Connectivity, Path, Cycle, Sub-Graph, Isomorphism, Eulerian and Hamiltonian Walks, Matrix representation of graphs, Shortest Path in Graph. Graph Colouring and Matching: Colouring Vertices and Chromatic Number, Colouring Edges and Total Colouring, Independence and Chromatic Partitioning, Cliques, Perfect Graphs, Bounds on Chromatic Numbers, Chromatic Polynomials, Matching. Tree: Rooted Trees, Binary Search Tree and Tree Sorting, Spanning Tree, Weighted Trees and prefix codes.' },
        ],
      },
      {
        code: 'ESC301',
        title: 'Analog Electronics',
        credits: 3,
        description: 'Principles of analog circuits, amplifiers, and electronic devices.',
        content: [
          { module: 'Module 1: Small Signal Amplifiers', hours: '4L', topics: 'Introduction to Analog Integrated Circuits, BJT Modeling-hybrid model of transistors; Emitter follower circuits, High frequency model of transistors. FET Small signal analysis - Source follower.' },
          { module: 'Module 2: Transistor Amplifiers', hours: '9L', topics: 'RC coupled amplifier, functions of all components, equivalent circuit, derivation of voltage gain, current gain, input impedance and output impedance, frequency response characteristics, lower and upper half frequencies, bandwidth, and concept of wide band amplifier. Feedback Amplifiers & Oscillators: Feedback concept, Voltage series-shunt, current series-shunt feedback Configurations, Berkhausen criterion, Colpitts, Hartley\'s, Phase shift, Wien bridge and crystal oscillators.' },
          { module: 'Module 3: Operational Amplifier', hours: '14L', topics: 'Introduction to Integrated Circuits, Differential Amplifier, Constant current source (current mirror etc.), level shifter, CMRR, Open & Closed loop circuits, importance of feedback loop (positive & negative), Block Diagram of OPAMP, Ideal OPAMP. Applications of Operational Amplifiers: analog adder, subtractor, integrator, differentiator, comparator, Schmitt Trigger. Instrumentation Amplifier, Log & Anti-log amplifiers, Analog multiplier, Precision Rectifier, voltage to current and current to voltage converter, free running Multivibrator, zero crossing detector. Multivibrator - Monostable, Bistable, Astable multivibrators; Monostable and astable operation using 555 timer.' },
          { module: 'Module 4: Large Signal Amplifiers', hours: '9L', topics: 'Introduction to power amplifiers (Class A, B, AB). Power Supply: Analysis for DC voltage and ripple voltage with C, L-C and C-L-C filters in Rectifier Circuit - Regulated DC power supplies- Line regulation, output resistance and temperature coefficient, Series and Shunt Voltage Regulation - percentage regulation, Fixed output voltage IC regulator 78xx and 79xx series, Adjustable output voltage regulator, LM 337 series power supply ICs, Concept of Switched Mode Power Supply.' },
        ],
      },
      {
        code: 'ESC302',
        title: 'Digital Logic and Electronics',
        credits: 3,
        description: 'Basic knowledge of digital logic levels and application to understand digital electronics circuits.',
        content: [
          { module: 'Module 1: Binary Number System', hours: '1L', topics: 'BCD, ASCII, EBDIC, Gray codes and their conversions.' },
          { module: 'Module 2: Boolean Algebra', hours: '1L', topics: 'Laws, Boolean functions, minterms, maxterms, Prime implicants, Representation in SOP and POS forms.' },
          { module: 'Module 3: Combinational Circuits', hours: '2L', topics: 'Adder and Subtractor (half-full adder & subtractor), Serial & Parallel Adder, Carry look ahead adder and Parity Generator, Encoder, Decoder, Multiplexer, Demultiplexer, Comparator, Code Converters.' },
          { module: 'Module 4: Sequential Circuits', hours: '5L', topics: 'Flip-flops, SR, JK, Master slave JK, D, T, characteristic Tables, Excitation tables. Basic concept of Synchronous and Asynchronous counters, Up/Down Counters, Ring counter, Johnson counter, Design of Modulo-N Counter, Counter applications.' },
          { module: 'Module 5: A/D and D/A Conversion', hours: '2L', topics: 'Basic concepts (D/A: R-2-R only, A/D: successive approximation).' },
          { module: 'Module 6: Logic Families and PLDs', hours: '2L', topics: 'TTL, ECL, MOS and CMOS - basic concepts. Programmable logic Array, programmable Array logic, Sequential Programmable Devices.' },
        ],
      },
      {
        code: 'PCC-CS301',
        title: 'IT Workshop',
        credits: 3,
        description: 'Familiarize students with the main features of the C++ language and object-oriented programming principles.',
        content: [
          { module: 'Module 1: Object-Oriented Programming Concepts', hours: '6L', topics: 'Comparison between procedural and object-oriented programming, basic concepts, operations on objects, abstraction, encapsulation, data hiding, inheritance, overloading, polymorphism, messaging.' },
          { module: 'Module 2: Classes and Objects', hours: '4L', topics: 'Specifying a class, creating class objects, access specifiers, static members, friends of a class, empty classes, nested classes, local classes, abstract classes, container classes, bit fields and classes.' },
          { module: 'Module 3: Constructors and Destructors', hours: '2L', topics: 'Need for constructors and destructors, copy constructor, dynamic constructors, explicit constructors, destructors, constructors and destructors with static members, initializer lists.' },
          { module: 'Module 4: Operator Overloading and Type Conversion', hours: '4L', topics: 'Overloading operators, rules for overloading operators, overloading of various operators, type conversion - basic type to class type, class type to basic type, class type to another class type.' },
          { module: 'Module 5: Pointers and Dynamic Memory Management', hours: '4L', topics: 'Declaring and initializing pointers, accessing data through pointers, pointer arithmetic, memory allocation (static and dynamic), dynamic memory management using new and delete operators, pointer to an object, this pointer, pointer related problems - dangling/wild pointers, null pointer assignment, memory leak and allocation failures.' },
          { module: 'Module 6: Inheritance and Polymorphism', hours: '5L', topics: 'Inheritance, forms of inheritance, ambiguity in multiple and multipath inheritance, virtual base class, object slicing, overriding member functions, object composition and delegation, order of execution of constructors and destructors.' },
          { module: 'Module 7: Virtual Functions & Polymorphism', hours: '3L', topics: 'Concept of binding - early binding and late binding, virtual functions, pure virtual functions, abstract classes, virtual destructors.' },
          { module: 'Module 8: Exception Handling', hours: '2L', topics: 'Review of traditional error handling, basics of exception handling, exception handling mechanism, throwing mechanism, catching mechanism, rethrowing an exception, specifying exceptions.' },
          { module: 'Module 9: Templates and Generic Programming', hours: '2L', topics: 'Template concepts, Function templates, class templates, illustrative examples.' },
          { module: 'Module 10: Files', hours: '2L', topics: 'File streams, hierarchy of file stream classes, error handling during file operations, reading/writing of files, accessing records randomly, updating files.' },
          { module: 'Module 11: MATLAB Overview', hours: '6L', topics: 'Environment, variable, constant, operators, loop, function, MATLAB Toolbox, MATLAB Graphic function, Reading and Writing to file, Numerical simulation.' },
        ],
      },
      {
        code: 'PCC-CS302',
        title: 'Data Structures',
        credits: 3,
        description: 'Understanding and implementing various data structures and algorithms.',
        content: [
          { module: 'Module 1: Introduction', hours: '4L', topics: 'Concepts of data and information; Concept of Abstract Data Type, Data Structure and Data Type. Classification of Data Structures- Primitive and Non-Primitive Data Structure, Linear and NonLinear Data Structure. Need of Data Structures. Algorithm analysis, time and space analysis of algorithms - Asymptotic notations like Big Oh (O), Small Oh(o), Big Omega (Ω), Small Omega (ω) and Theta (Θ) notation (definition and significance).' },
          { module: 'Module 2: Non-Restricted Linear Data Structure', hours: '9L', topics: 'List or Linear List: Definition and Example, List as ADT. Representation of Linear ListSequential Representation and Linked Representation. Array: Introduction to sequential representation, Linearization of multidimensional array. Application of array- representation of polynomial using array, Representation of Sparse matrix using array. Linked List: Introduction to linked representation, Implementation of different types of linked listSingly linked list, Doubly linked list, Circular linked list, Circular Doubly Linked List. Application of Linked list- Representation of polynomial.' },
          { module: 'Module 3: Restricted Linear Data Structure', hours: '6L', topics: 'Stack: Definition of Stack, implementations of stack using array and linked list. Applications of stack- infix to postfix conversion, Postfix Evaluation. Recursion: Principles of recursion - use of stack, tail recursion. Tower of Hanoi using recursion. Queue: Definition of Queue; Implementation of queue using array- physical, linear and circular model; Implementation of queue using linked list. Dequeue- Definition and different types of dequeue.' },
          { module: 'Module 4: Non-Linear Data Structures', hours: '9L', topics: 'Trees and Binary Tree: Basic terminologies; Definition of tree and binary tree. Difference between tree and binary tree, Representation of binary tree (using array and linked list). Binary tree traversal (pre-, in-, post- order); Threaded binary tree- definition, insertion and deletion algorithm; Binary search tree- Definition, insertion, deletion, searching algorithm; Height balanced binary tree: AVL tree- definition, insertion and deletion with examples only. m -Way Search Tree: B Tree - Definition, insertion and deletion with examples only; B+ Tree Definition, insertion and deletion with examples only. Heap: Definition (min heap and max heap), creation, insertion and deletion algorithm. Application of heap (priority queue and sorting). Graphs: Definition and representation (adjacency matrix, incidence matrix and adjacency list). Graph traversal- Depth-first search (DFS), Breadth-first search (BFS) - concepts of edges used in DFS and BFS (tree-edge, back-edge, cross-edge, and forward-edge).' },
          { module: 'Module 5: Sorting and Searching', hours: '8L', topics: 'Sorting Algorithms: Definition and need of sorting, different types of sorting algorithm (internal, external, stable, in-place, comparison based); Factors affecting sorting Methods, Bubble sort, Insertion sort, Selection sort, Quick sort, Merge sort, Radix sort - algorithm with analysis (time complexity). Searching: Factors affecting searching Methods; Sequential search - algorithm with analysis (time complexity); improvement using sentinel. Binary search and Interpolation Search algorithm with analysis (time complexity). Hashing: Introduction and purpose of Hashing and Hash functions (division, folding and midsquare), Collision resolution techniques.' },
        ],
      },
      {
        code: 'HSMC303',
        title: 'Universal Human Values 2: Understanding Harmony',
        credits: 3,
        description: 'Developing a holistic perspective on self-exploration, family, society, and nature/existence.',
        content: [
          { module: 'Module 1: Course Introduction', hours: '8L', topics: 'Self-Exploration-what is it? -Its content and process; Natural Acceptance and Experiential Validation- as the process for self-exploration. Continuous Happiness and Prosperity- A look at basic Human Aspirations. Right understanding, Relationship and Physical Facility- the basic requirements for fulfillment of aspirations of every human being with their correct priority. Understanding Happiness and Prosperity correctly- A critical appraisal of the current scenario. Method to fulfill the above human aspirations: understanding and living in harmony at various levels. Practice sessions to discuss natural acceptance in human being as the innate acceptance for living with responsibility (living in relationship, harmony and co-existence) rather than as arbitrariness in choice based on liking-disliking.' },
          { module: 'Module 2: Understanding Harmony in the Human Being', hours: '6L', topics: 'Understanding human being as a co-existence of the sentient I and the material Body. Understanding the needs of Self (I) and Body - happiness and physical facility. Understanding the Body as an instrument of I (I being the doer, seer and enjoyer). Understanding the characteristics and activities of I and harmony in I. Understanding the harmony of I with the Body: Sanyam and Health; correct appraisal of Physical needs, meaning of Prosperity in detail. Programs to ensure Sanyam and Health. Practice sessions to discuss the role others have played in making material goods available to me. Identifying from one\'s own life. Differentiate between prosperity and accumulation. Ensuring health vs dealing with disease discussion.' },
          { module: 'Module 3: Understanding Harmony in the Family and Society', hours: '7L', topics: 'Understanding values in human-human relationship; meaning of Justice (nine universal values in relationships) and program for its fulfilment to ensure mutual happiness; Trust and Respect as the foundational values of relationship. Understanding the meaning of Trust; Difference between intention and competence. Understanding the meaning of Respect, Difference between respect and differentiation; the other salient values in relationship. Understanding the harmony in the society (society being an extension of family): Resolution, Prosperity, fearlessness (trust) and coexistence as comprehensive Human Goals. Visualizing a universal harmonious order in societyUndivided Society, Universal Order- from family to world family. Practice sessions to reflect on relationships in family, hostel and institute as extended family, real life examples, teacher-student relationship, goal of education etc. Gratitude as a universal value in relationships. Elicit examples from students\' lives.' },
          { module: 'Module 4: Understanding Harmony in Nature and Existence', hours: '8L', topics: 'Understanding the harmony in the Nature. Interconnectedness and mutual fulfilment among the four orders of nature- recyclability and self- regulation in nature. Understanding Existence as Coexistence of mutually interacting units in all-pervasive space. Holistic perception of harmony at all levels of existence. Practice sessions to discuss human being as cause of imbalance in nature (film Home can be used), pollution, depletion of resources and role of Technology etc.' },
          { module: 'Module 5: Implications on Professional Ethics', hours: '7L', topics: 'Natural acceptance of human values. Definitiveness of Ethical Human Conduct. Basis for Humanistic Education, Humanistic Constitution and Humanistic Universal Order. Competence in professional ethics: Ability to utilize the professional competence for augmenting universal human order. Ability to identify the scope and characteristics of people- friendly and eco-friendly production systems. Ability to identify and develop appropriate technologies and management patterns for above production systems. Case studies of typical holistic technologies, management models and production systems. Strategy for transition from the present state to Universal Human Order: At the level of individual: as socially and ecologically responsible engineers, technologists and managers. At the level of society: as mutually enriching institutions and organizations. Practice Exercises and Case Studies in Practice (tutorial) Sessions to discuss the conduct as an engineer or scientist etc.' },
        ],
      },
    ],
    '4': [
      {
        code: 'PCC-CS401',
        title: 'Computer Organization',
        credits: 3,
        description: 'Study of the organizational structure and functional behavior of computer systems.',
        content: [
          { module: 'Module 1: Introduction to Computer Organization', hours: '6L', topics: 'Basic computer organization, processing unit, memory subsystem, input/output subsystem.' },
          { module: 'Module 2: Processing Unit', hours: '6L', topics: 'CPU design, instruction set architecture, microarchitecture, control unit design.' },
          { module: 'Module 3: Memory Subsystem', hours: '6L', topics: 'Memory hierarchy, cache memory, main memory, secondary storage.' },
          { module: 'Module 4: Input/Output Subsystem', hours: '6L', topics: 'I/O devices, I/O controllers, I/O buses, direct memory access.' },
          { module: 'Module 5: High-Performance Processors', hours: '6L', topics: 'Pipelining, superscalar processors, parallel processing.' },
        ],
      },
      {
        code: 'PCC-CS402',
        title: 'Design and Analysis of Algorithms',
        credits: 3,
        description: 'Study of algorithms, their design, analysis, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Algorithms', hours: '6L', topics: 'Algorithm design techniques, algorithm analysis, time and space complexity.' },
          { module: 'Module 2: Divide and Conquer', hours: '6L', topics: 'Divide and conquer strategy, recurrence relations, master theorem.' },
          { module: 'Module 3: Dynamic Programming', hours: '6L', topics: 'Dynamic programming technique, optimal substructure, overlapping subproblems.' },
          { module: 'Module 4: Greedy Algorithms', hours: '6L', topics: 'Greedy algorithm design, optimality criterion, greedy choice property.' },
          { module: 'Module 5: Graph Algorithms', hours: '6L', topics: 'Graph representations, graph traversal algorithms, shortest path algorithms, minimum spanning tree algorithms.' },
          { module: 'Module 6: Advanced Topics', hours: '6L', topics: 'Backtracking, branch and bound, approximation algorithms.' },
        ],
      },
      {
        code: 'PCC-CS403',
        title: 'Operating Systems',
        credits: 3,
        description: 'Study of operating systems, their design, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Operating Systems', hours: '6L', topics: 'Operating system structures, processes, threads, concurrency, CPU scheduling.' },
          { module: 'Module 2: Process Management', hours: '6L', topics: 'Process synchronization, interprocess communication, deadlocks.' },
          { module: 'Module 3: Memory Management', hours: '6L', topics: 'Memory allocation, paging, segmentation, virtual memory.' },
          { module: 'Module 4: File Systems', hours: '6L', topics: 'File system interface, file system implementation, directory implementation.' },
          { module: 'Module 5: Device Management', hours: '6L', topics: 'I/O systems, device drivers, disk scheduling.' },
          { module: 'Module 6: Protection and Security', hours: '6L', topics: 'Protection mechanisms, security models, access control.' },
        ],
      },
      {
        code: 'PCC-CS404',
        title: 'Formal Languages and Automata Theory',
        credits: 3,
        description: 'Study of formal languages, automata, and their applications in computer science.',
        content: [
          { module: 'Module 1: Introduction to Formal Languages', hours: '6L', topics: 'Alphabets, strings, languages, grammars, types of grammars.' },
          { module: 'Module 2: Finite Automata', hours: '6L', topics: 'Deterministic finite automata, nondeterministic finite automata, minimization of finite automata.' },
          { module: 'Module 3: Regular Expressions and Languages', hours: '6L', topics: 'Regular expressions, regular languages, operations on regular languages.' },
          { module: 'Module 4: Context-Free Grammars', hours: '6L', topics: 'Context-free grammars, derivations, parse trees, ambiguity.' },
          { module: 'Module 5: Pushdown Automata', hours: '6L', topics: 'Pushdown automata, deterministic pushdown automata, context-free languages.' },
          { module: 'Module 6: Turing Machines', hours: '6L', topics: 'Turing machines, computability, decidability, undecidability.' },
        ],
      },
      {
        code: 'BSC401',
        title: 'Probability and Statistics',
        credits: 3,
        description: 'Study of probability theory and statistical methods.',
        content: [
          { module: 'Module 1: Probability Theory', hours: '6L', topics: 'Basic probability concepts, probability rules, conditional probability, independence.' },
          { module: 'Module 2: Discrete Random Variables', hours: '6L', topics: 'Probability mass function, expected value, variance, binomial distribution, Poisson distribution.' },
          { module: 'Module 3: Continuous Random Variables', hours: '6L', topics: 'Probability density function, cumulative distribution function, expected value, variance, normal distribution.' },
          { module: 'Module 4: Joint Distributions', hours: '6L', topics: 'Joint probability mass function, joint probability density function, marginal distributions, conditional distributions.' },
          { module: 'Module 5: Statistical Inference', hours: '6L', topics: 'Point estimation, interval estimation, hypothesis testing.' },
          { module: 'Module 6: Correlation and Regression', hours: '6L', topics: 'Correlation coefficient, simple linear regression, multiple regression.' },
        ],
      },
      {
        code: 'HSMC402',
        title: 'Gender, Culture, and Development',
        credits: 2,
        description: 'Study of gender, culture, and their impact on development.',
        content: [
          { module: 'Module 1: Gender and Development', hours: '6L', topics: 'Gender roles, gender equality, women\'s empowerment.' },
          { module: 'Module 2: Culture and Development', hours: '6L', topics: 'Cultural diversity, cultural values, cultural change.' },
          { module: 'Module 3: Development Studies', hours: '6L', topics: 'Development theories, development indicators, sustainable development.' },
          { module: 'Module 4: Case Studies', hours: '6L', topics: 'Case studies on gender, culture, and development.' },
        ],
      },
    ],
    '5': [
      {
        code: 'PCC-CS501',
        title: 'Compiler Design',
        credits: 3,
        description: 'Study of the design and implementation of compilers.',
        content: [
          { module: 'Module 1: Introduction to Compilers', hours: '6L', topics: 'Compiler structure, phases of compilation, compiler design issues.' },
          { module: 'Module 2: Lexical Analysis', hours: '6L', topics: 'Lexical analysis, regular expressions, finite automata, lexical analyzer generation.' },
          { module: 'Module 3: Syntax Analysis', hours: '6L', topics: 'Context-free grammars, parsing techniques, syntax-directed translation.' },
          { module: 'Module 4: Semantic Analysis', hours: '6L', topics: 'Attribute grammars, semantic rules, type checking.' },
          { module: 'Module 5: Intermediate Code Generation', hours: '6L', topics: 'Intermediate representations, intermediate code generation, symbol tables.' },
          { module: 'Module 6: Code Optimization', hours: '6L', topics: 'Code optimization techniques, data flow analysis, control flow analysis.' },
          { module: 'Module 7: Code Generation', hours: '6L', topics: 'Code generation, instruction selection, register allocation.' },
        ],
      },
      {
        code: 'PCC-CS502',
        title: 'Database Management Systems',
        credits: 3,
        description: 'Study of database systems, their design, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Database Systems', hours: '6L', topics: 'Database system architecture, data models, database design.' },
          { module: 'Module 2: Relational Database Model', hours: '6L', topics: 'Relational algebra, relational calculus, SQL.' },
          { module: 'Module 3: Database Design', hours: '6L', topics: 'ER modeling, normalization, schema design.' },
          { module: 'Module 4: Query Processing and Optimization', hours: '6L', topics: 'Query processing, query optimization, query execution plans.' },
          { module: 'Module 5: Transaction Management', hours: '6L', topics: 'Transaction processing, concurrency control, recovery mechanisms.' },
          { module: 'Module 6: Distributed Database Systems', hours: '6L', topics: 'Distributed database architecture, distributed query processing, distributed transaction management.' },
        ],
      },
      {
        code: 'PCC-CS503',
        title: 'Computer Networks',
        credits: 3,
        description: 'Study of computer networks, their design, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Computer Networks', hours: '6L', topics: 'Network architecture, network protocols, network services.' },
          { module: 'Module 2: Data Link Layer', hours: '6L', topics: 'Error detection and correction, multiple access protocols, switching.' },
          { module: 'Module 3: Network Layer', hours: '6L', topics: 'IP addressing, routing algorithms, congestion control.' },
          { module: 'Module 4: Transport Layer', hours: '6L', topics: 'Transport protocols, flow control, error control.' },
          { module: 'Module 5: Application Layer', hours: '6L', topics: 'Application layer protocols, socket programming.' },
          { module: 'Module 6: Network Security', hours: '6L', topics: 'Network security threats, network security mechanisms, cryptography.' },
        ],
      },
      {
        code: 'PCC-CS504',
        title: 'Object-Oriented Programming using Java',
        credits: 3,
        description: 'Study of object-oriented programming concepts using Java.',
        content: [
          { module: 'Module 1: Introduction to Java', hours: '6L', topics: 'Java programming basics, Java development environment.' },
          { module: 'Module 2: Object-Oriented Programming Concepts', hours: '6L', topics: 'Classes, objects, inheritance, polymorphism, encapsulation.' },
          { module: 'Module 3: Advanced Java Features', hours: '6L', topics: 'Exception handling, multithreading, Java I/O, Java collections framework.' },
          { module: 'Module 4: GUI Programming', hours: '6L', topics: 'AWT, Swing, event handling.' },
          { module: 'Module 5: Java Networking', hours: '6L', topics: 'Socket programming, RMI, servlets.' },
          { module: 'Module 6: Java Database Connectivity', hours: '6L', topics: 'JDBC, connecting to databases, executing SQL queries.' },
        ],
      },
      {
        code: 'HSMC505',
        title: 'Principles of Management',
        credits: 2,
        description: 'Study of management principles and their application in organizations.',
        content: [
          { module: 'Module 1: Introduction to Management', hours: '6L', topics: 'Management functions, management processes, management skills.' },
          { module: 'Module 2: Planning', hours: '6L', topics: 'Planning process, types of plans, planning techniques.' },
          { module: 'Module 3: Organizing', hours: '6L', topics: 'Organizational structure, organizational design, delegation of authority.' },
          { module: 'Module 4: Staffing', hours: '6L', topics: 'Recruitment, selection, training, and development.' },
          { module: 'Module 5: Directing', hours: '6L', topics: 'Leadership, motivation, communication, group dynamics.' },
          { module: 'Module 6: Controlling', hours: '6L', topics: 'Control process, control techniques, control systems.' },
        ],
      },
    ],
    '6': [
      {
        code: 'PCC-CS601',
        title: 'Computer Networks',
        credits: 3,
        description: 'Study of computer networks, their design, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Computer Networks', hours: '6L', topics: 'Network architecture, network protocols, network services.' },
          { module: 'Module 2: Data Link Layer', hours: '6L', topics: 'Error detection and correction, multiple access protocols, switching.' },
          { module: 'Module 3: Network Layer', hours: '6L', topics: 'IP addressing, routing algorithms, congestion control.' },
          { module: 'Module 4: Transport Layer', hours: '6L', topics: 'Transport protocols, flow control, error control.' },
          { module: 'Module 5: Application Layer', hours: '6L', topics: 'Application layer protocols, socket programming.' },
          { module: 'Module 6: Network Security', hours: '6L', topics: 'Network security threats, network security mechanisms, cryptography.' },
        ],
      },
      {
        code: 'PCC-CS602',
        title: 'Software Engineering',
        credits: 3,
        description: 'Study of software engineering principles and practices.',
        content: [
          { module: 'Module 1: Introduction to Software Engineering', hours: '6L', topics: 'Software engineering principles, software development life cycle, software process models.' },
          { module: 'Module 2: Requirements Engineering', hours: '6L', topics: 'Requirements elicitation, requirements analysis, requirements specification.' },
          { module: 'Module 3: Software Design', hours: '6L', topics: 'Software architecture, design patterns, design principles.' },
          { module: 'Module 4: Software Construction', hours: '6L', topics: 'Coding standards, code reviews, unit testing.' },
          { module: 'Module 5: Software Testing', hours: '6L', topics: 'Testing techniques, test case design, test management.' },
          { module: 'Module 6: Software Maintenance', hours: '6L', topics: 'Software maintenance processes, software evolution, legacy systems.' },
        ],
      },
      {
        code: 'PCC-CS603',
        title: 'Compiler Design',
        credits: 3,
        description: 'Study of the design and implementation of compilers.',
        content: [
          { module: 'Module 1: Introduction to Compilers', hours: '6L', topics: 'Compiler structure, phases of compilation, compiler design issues.' },
          { module: 'Module 2: Lexical Analysis', hours: '6L', topics: 'Lexical analysis, regular expressions, finite automata, lexical analyzer generation.' },
          { module: 'Module 3: Syntax Analysis', hours: '6L', topics: 'Context-free grammars, parsing techniques, syntax-directed translation.' },
          { module: 'Module 4: Semantic Analysis', hours: '6L', topics: 'Attribute grammars, semantic rules, type checking.' },
          { module: 'Module 5: Intermediate Code Generation', hours: '6L', topics: 'Intermediate representations, intermediate code generation, symbol tables.' },
          { module: 'Module 6: Code Optimization', hours: '6L', topics: 'Code optimization techniques, data flow analysis, control flow analysis.' },
          { module: 'Module 7: Code Generation', hours: '6L', topics: 'Code generation, instruction selection, register allocation.' },
        ],
      },
      {
        code: 'PCC-CS604',
        title: 'Operating Systems',
        credits: 3,
        description: 'Study of operating systems, their design, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Operating Systems', hours: '6L', topics: 'Operating system structures, processes, threads, concurrency, CPU scheduling.' },
          { module: 'Module 2: Process Management', hours: '6L', topics: 'Process synchronization, interprocess communication, deadlocks.' },
          { module: 'Module 3: Memory Management', hours: '6L', topics: 'Memory allocation, paging, segmentation, virtual memory.' },
          { module: 'Module 4: File Systems', hours: '6L', topics: 'File system interface, file system implementation, directory implementation.' },
          { module: 'Module 5: Device Management', hours: '6L', topics: 'I/O systems, device drivers, disk scheduling.' },
          { module: 'Module 6: Protection and Security', hours: '6L', topics: 'Protection mechanisms, security models, access control.' },
        ],
      },
      {
        code: 'HSMC604',
        title: 'Economics for Engineers',
        credits: 2,
        description: 'Study of economics principles and their application in engineering.',
        content: [
          { module: 'Module 1: Introduction to Economics', hours: '6L', topics: 'Basic economic concepts, supply and demand, market structures.' },
          { module: 'Module 2: Microeconomics', hours: '6L', topics: 'Consumer theory, production theory, market structures, general equilibrium.' },
          { module: 'Module 3: Macroeconomics', hours: '6L', topics: 'National income, money and banking, fiscal policy, monetary policy.' },
          { module: 'Module 4: International Economics', hours: '6L', topics: 'International trade, exchange rates, balance of payments, international financial system.' },
          { module: 'Module 5: Engineering Economics', hours: '6L', topics: 'Engineering economic analysis, capital budgeting, cost-benefit analysis, replacement analysis.' },
        ],
      },
    ],
    '7': [
      {
        code: 'PEC-CS-T-701',
        title: 'Information Theory and Coding',
        credits: 3,
        description: 'Study of information theory and coding techniques.',
        content: [
          { module: 'Module 1: Introduction to Information Theory', hours: '6L', topics: 'Basic concepts, entropy, mutual information, channel capacity.' },
          { module: 'Module 2: Source Coding', hours: '6L', topics: 'Source coding theorem, Huffman coding, arithmetic coding.' },
          { module: 'Module 3: Channel Coding', hours: '6L', topics: 'Channel coding theorem, error detection and correction, block codes, convolutional codes.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Network coding, rateless codes, LDPC codes, turbo codes.' },
        ],
      },
      {
        code: 'PEC-CS-S-701',
        title: 'Ad-Hoc and Sensor Networks',
        credits: 3,
        description: 'Study of ad-hoc and sensor networks, their design, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Ad-Hoc Networks', hours: '6L', topics: 'Basic concepts, routing protocols, mobility management.' },
          { module: 'Module 2: Sensor Networks', hours: '6L', topics: 'Sensor network architecture, data aggregation, energy management.' },
          { module: 'Module 3: Security in Ad-Hoc and Sensor Networks', hours: '6L', topics: 'Security threats, security mechanisms, key management.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Cross-layer design, quality of service, energy harvesting.' },
        ],
      },
      {
        code: 'PEC-CS-D-701',
        title: 'Data Mining and Data Warehouse',
        credits: 3,
        description: 'Study of data mining and data warehouse concepts and techniques.',
        content: [
          { module: 'Module 1: Introduction to Data Mining', hours: '6L', topics: 'Basic concepts, data mining process, data mining techniques.' },
          { module: 'Module 2: Data Warehousing', hours: '6L', topics: 'Data warehouse architecture, data warehouse design, ETL process.' },
          { module: 'Module 3: Data Mining Algorithms', hours: '6L', topics: 'Classification, clustering, association rule mining, sequential pattern mining.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Text mining, web mining, stream mining, big data analytics.' },
        ],
      },
      {
        code: 'PEC-CS-A-701',
        title: 'Cloud Computing',
        credits: 3,
        description: 'Study of cloud computing concepts, technologies, and applications.',
        content: [
          { module: 'Module 1: Introduction to Cloud Computing', hours: '6L', topics: 'Basic concepts, cloud computing models, cloud computing architecture.' },
          { module: 'Module 2: Cloud Infrastructure', hours: '6L', topics: 'Virtualization, cloud storage, cloud networking, cloud security.' },
          { module: 'Module 3: Cloud Services', hours: '6L', topics: 'Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS).' },
          { module: 'Module 4: Cloud Applications', hours: '6L', topics: 'Cloud-based application development, cloud-based application deployment, cloud-based application management.' },
        ],
      },
      {
        code: 'OEC-CS-701A',
        title: 'High Performance Computing',
        credits: 3,
        description: 'Study of high performance computing concepts, technologies, and applications.',
        content: [
          { module: 'Module 1: Introduction to High Performance Computing', hours: '6L', topics: 'Basic concepts, high performance computing architecture, high performance computing applications.' },
          { module: 'Module 2: Parallel Computing', hours: '6L', topics: 'Parallel computing models, parallel programming, parallel algorithms.' },
          { module: 'Module 3: Distributed Computing', hours: '6L', topics: 'Distributed computing models, distributed programming, distributed algorithms.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Grid computing, cloud computing, quantum computing.' },
        ],
      },
      {
        code: 'OEC-CS-702A',
        title: 'Cyber Law and Ethics',
        credits: 3,
        description: 'Study of cyber law and ethics in the context of computer science and engineering.',
        content: [
          { module: 'Module 1: Introduction to Cyber Law', hours: '6L', topics: 'Basic concepts, cyber law framework, cyber law jurisdiction.' },
          { module: 'Module 2: Cyber Crimes', hours: '6L', topics: 'Types of cyber crimes, cyber crime investigation, cyber crime prevention.' },
          { module: 'Module 3: Cyber Ethics', hours: '6L', topics: 'Ethical issues in cyber space, ethical guidelines for cyber professionals, ethical decision making in cyber space.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Cyber law and ethics in emerging technologies, cyber law and ethics in global context, cyber law and ethics in future scenarios.' },
        ],
      },
      {
        code: 'PR791',
        title: 'Major Project-I',
        credits: 2,
        description: 'Major project work in the area of computer science and engineering.',
        content: [
          { module: 'Module 1: Project Proposal', hours: '6L', topics: 'Project proposal writing, project proposal presentation.' },
          { module: 'Module 2: Project Implementation', hours: '6L', topics: 'Project implementation plan, project implementation, project documentation.' },
          { module: 'Module 3: Project Evaluation', hours: '6L', topics: 'Project evaluation criteria, project evaluation, project defense.' },
        ],
      },
      {
        code: 'PR792',
        title: 'Industrial Training / Internship',
        credits: 1,
        description: 'Industrial training or internship in the area of computer science and engineering.',
        content: [
          { module: 'Module 1: Industrial Training', hours: '6L', topics: 'Industrial training objectives, industrial training plan, industrial training report.' },
          { module: 'Module 2: Internship', hours: '6L', topics: 'Internship objectives, internship plan, internship report.' },
        ],
      },
      {
        code: 'PR793',
        title: 'Skill Development VII: Seminar & Group Discussion',
        credits: 0.5,
        description: 'Skill development through seminar and group discussion.',
        content: [
          { module: 'Module 1: Seminar', hours: '6L', topics: 'Seminar preparation, seminar presentation, seminar evaluation.' },
          { module: 'Module 2: Group Discussion', hours: '6L', topics: 'Group discussion preparation, group discussion participation, group discussion evaluation.' },
        ],
      },
      {
        code: 'MC781',
        title: 'Entrepreneurship & Innovation Skill',
        credits: 3,
        description: 'Study of entrepreneurship and innovation skills in the context of computer science and engineering.',
        content: [
          { module: 'Module 1: Introduction to Entrepreneurship', hours: '6L', topics: 'Basic concepts, entrepreneurship process, entrepreneurship ecosystem.' },
          { module: 'Module 2: Innovation Management', hours: '6L', topics: 'Innovation process, innovation strategies, innovation management tools.' },
          { module: 'Module 3: Entrepreneurial Finance', hours: '6L', topics: 'Entrepreneurial finance concepts, entrepreneurial finance sources, entrepreneurial finance management.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Social entrepreneurship, sustainable entrepreneurship, global entrepreneurship.' },
        ],
      },
    ],
    '8': [
      {
        code: 'PEC-CS-T-801',
        title: 'Advanced Graph Algorithms',
        credits: 3,
        description: 'Study of advanced graph algorithms and their applications.',
        content: [
          { module: 'Module 1: Introduction to Graph Algorithms', hours: '6L', topics: 'Basic concepts, graph representations, graph traversal algorithms.' },
          { module: 'Module 2: Shortest Path Algorithms', hours: '6L', topics: 'Dijkstra\'s algorithm, Bellman-Ford algorithm, A* algorithm.' },
          { module: 'Module 3: Minimum Spanning Tree Algorithms', hours: '6L', topics: 'Kruskal\'s algorithm, Prim\'s algorithm, Boruvka\'s algorithm.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Network flow algorithms, graph partitioning algorithms, graph drawing algorithms.' },
        ],
      },
      {
        code: 'PEC-CS-S-801',
        title: 'Real Time Systems',
        credits: 3,
        description: 'Study of real time systems, their design, and implementation.',
        content: [
          { module: 'Module 1: Introduction to Real Time Systems', hours: '6L', topics: 'Basic concepts, real time systems architecture, real time systems applications.' },
          { module: 'Module 2: Real Time Operating Systems', hours: '6L', topics: 'Real time operating systems concepts, real time operating systems design, real time operating systems implementation.' },
          { module: 'Module 3: Real Time Scheduling', hours: '6L', topics: 'Real time scheduling algorithms, real time scheduling analysis, real time scheduling optimization.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Real time communication, real time data management, real time security.' },
        ],
      },
      {
        code: 'PEC-CS-D-801',
        title: 'Data Analytics',
        credits: 3,
        description: 'Study of data analytics concepts, techniques, and applications.',
        content: [
          { module: 'Module 1: Introduction to Data Analytics', hours: '6L', topics: 'Basic concepts, data analytics process, data analytics techniques.' },
          { module: 'Module 2: Data Mining', hours: '6L', topics: 'Data mining algorithms, data mining tools, data mining applications.' },
          { module: 'Module 3: Big Data Analytics', hours: '6L', topics: 'Big data analytics concepts, big data analytics tools, big data analytics applications.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Machine learning for data analytics, deep learning for data analytics, artificial intelligence for data analytics.' },
        ],
      },
      {
        code: 'PEC-CS-A-801',
        title: 'Computer Graphics',
        credits: 3,
        description: 'Study of computer graphics concepts, techniques, and applications.',
        content: [
          { module: 'Module 1: Introduction to Computer Graphics', hours: '6L', topics: 'Basic concepts, computer graphics architecture, computer graphics applications.' },
          { module: 'Module 2: 2D Computer Graphics', hours: '6L', topics: '2D computer graphics algorithms, 2D computer graphics tools, 2D computer graphics applications.' },
          { module: 'Module 3: 3D Computer Graphics', hours: '6L', topics: '3D computer graphics algorithms, 3D computer graphics tools, 3D computer graphics applications.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Computer animation, computer vision, virtual reality.' },
        ],
      },
      {
        code: 'OEC-CS-801A',
        title: 'Human Resource Development and Organizational Behavior',
        credits: 3,
        description: 'Study of human resource development and organizational behavior in the context of computer science and engineering.',
        content: [
          { module: 'Module 1: Introduction to Human Resource Development', hours: '6L', topics: 'Basic concepts, human resource development process, human resource development techniques.' },
          { module: 'Module 2: Organizational Behavior', hours: '6L', topics: 'Organizational behavior theories, organizational behavior models, organizational behavior applications.' },
          { module: 'Module 3: Human Resource Management', hours: '6L', topics: 'Human resource management concepts, human resource management tools, human resource management applications.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Human resource analytics, human resource technology, human resource innovation.' },
        ],
      },
      {
        code: 'OEC-CS-802A',
        title: 'Values and Ethics in Profession',
        credits: 3,
        description: 'Study of values and ethics in the context of computer science and engineering.',
        content: [
          { module: 'Module 1: Introduction to Values and Ethics', hours: '6L', topics: 'Basic concepts, values and ethics framework, values and ethics principles.' },
          { module: 'Module 2: Professional Ethics', hours: '6L', topics: 'Professional ethics concepts, professional ethics codes, professional ethics dilemmas.' },
          { module: 'Module 3: Ethics in Computer Science and Engineering', hours: '6L', topics: 'Ethics in computer science and engineering applications, ethics in computer science and engineering challenges, ethics in computer science and engineering solutions.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Ethics in emerging technologies, ethics in global context, ethics in future scenarios.' },
        ],
      },
      {
        code: 'PR891',
        title: 'Major Project-II',
        credits: 6,
        description: 'Major project work in the area of computer science and engineering.',
        content: [
          { module: 'Module 1: Project Proposal', hours: '6L', topics: 'Project proposal writing, project proposal presentation.' },
          { module: 'Module 2: Project Implementation', hours: '6L', topics: 'Project implementation plan, project implementation, project documentation.' },
          { module: 'Module 3: Project Evaluation', hours: '6L', topics: 'Project evaluation criteria, project evaluation, project defense.' },
        ],
      },
      {
        code: 'PR892',
        title: 'Grand Viva',
        credits: 1,
        description: 'Grand viva examination for the major project work.',
        content: [
          { module: 'Module 1: Grand Viva Preparation', hours: '6L', topics: 'Grand viva preparation, grand viva presentation.' },
          { module: 'Module 2: Grand Viva Evaluation', hours: '6L', topics: 'Grand viva evaluation criteria, grand viva evaluation, grand viva defense.' },
        ],
      },
      {
        code: 'MC801',
        title: 'Essence of Indian Knowledge Tradition',
        credits: 3,
        description: 'Study of the essence of Indian knowledge tradition in the context of computer science and engineering.',
        content: [
          { module: 'Module 1: Introduction to Indian Knowledge Tradition', hours: '6L', topics: 'Basic concepts, Indian knowledge tradition framework, Indian knowledge tradition principles.' },
          { module: 'Module 2: Indian Knowledge Systems', hours: '6L', topics: 'Indian knowledge systems concepts, Indian knowledge systems applications, Indian knowledge systems challenges.' },
          { module: 'Module 3: Indian Knowledge Tradition in Computer Science and Engineering', hours: '6L', topics: 'Indian knowledge tradition in computer science and engineering applications, Indian knowledge tradition in computer science and engineering challenges, Indian knowledge tradition in computer science and engineering solutions.' },
          { module: 'Module 4: Advanced Topics', hours: '6L', topics: 'Indian knowledge tradition in emerging technologies, Indian knowledge tradition in global context, Indian knowledge tradition in future scenarios.' },
        ],
      },
    ],
  };
  

  // Helper Functions
  const calculatePercentage = () => {
    let result;
    const cgpaValue = parseFloat(cgpa);
    if (isNaN(cgpaValue)) {
      setPercentage('Invalid input');
      return;
    }

    switch (gradingSystem) {
      case 'JIS System':
        result = (cgpaValue * 10) - 7.5;
        break;
      case '10-point':
        result = (cgpaValue / 10) * 100;
        break;
      case '4-point':
        result = (cgpaValue / 4) * 100;
        break;
      case '7-point':
        result = (cgpaValue / 7) * 100;
        break;
      case '5-point':
        result = (cgpaValue / 5) * 100;
        break;
      default:
        result = 'Invalid grading system';
    }
    setPercentage(result?.toFixed(2) || 'Invalid input');
  };

  const addTask = (status) => {
    if (newTask.trim()) {
      setTasks({
        ...tasks,
        [status]: [...tasks[status], { id: Date.now().toString(), content: newTask }],
      });
      setNewTask('');
    }
  };

  const moveTask = (taskId, newStatus) => {
    let taskToMove = null;
    let currentColumn = null;
    for (const [column, tasksList] of Object.entries(tasks)) {
      const task = tasksList.find(t => t.id === taskId);
      if (task) {
        taskToMove = task;
        currentColumn = column;
        break;
      }
    }

    if (!taskToMove) return;

    const updatedTasks = {
      ...tasks,
      [currentColumn]: tasks[currentColumn].filter(t => t.id !== taskId),
      [newStatus]: [...tasks[newStatus], taskToMove],
    };
    setTasks(updatedTasks);
    setSelectedTask(null); // Close popup
  };

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
  };

  const handleSubmitLostFound = (e) => {
    e.preventDefault();
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ title: '', description: '', type: 'lost' });
  };

  const addPrepTask = (e) => {
    e.preventDefault();
    if (newPrepTask.title.trim()) {
      setPrepTasks([...prepTasks, { ...newPrepTask, id: Date.now() }]);
      setNewPrepTask({ title: '', deadline: '', priority: 'Medium', completed: false });
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setPrepTasks(prepTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredSyllabus = syllabusData[selectedSemester].filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '100vw',
      margin: '0 auto',
      fontFamily: '"Arial", sans-serif',
      background: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      minHeight: '100vh',
    },
    title: {
      fontSize: '2.5rem',
      color: '#000',
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    navButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      background: '#f5f5f5',
      cursor: 'pointer',
      transition: 'background 0.3s, transform 0.2s',
      fontSize: '1rem',
      color: '#666',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    },
    navButtonActive: {
      background: '#007bff',
      color: 'white',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    navButtonHover: {
      background: '#e0e0e0',
      transform: 'scale(1.05)',
    },
    toolContent: {
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      animation: 'slideUp 0.5s ease-out',
    },
    card: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      background: 'white',
      maxWidth: '1000px',
      margin: '0 auto',
      
    },
    inputField: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '4px',
      transition: 'border-color 0.3s',
      fontSize: '1rem',
      color: '#333',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    button: {
      background: '#000',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '10px', // No border radius for "Calculate Percentage" as per image
      cursor: 'pointer',
      transition: 'background 0.3s, transform 0.2s',
      width: '100%',
      marginTop: '10px',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    buttonHover: {
      background: '#333',
      transform: 'scale(1.05)',
    },
    result: {
      marginTop: '10px',
      fontSize: '1.2rem',
      color: '#333',
      animation: 'fadeIn 0.5s',
    },
    kanbanColumns: {
      display: 'flex',
      gap: '20px',
      overflowX: 'auto',
      flexWrap: 'wrap',
    },
    column: {
      minWidth: '250px',
      background: '#f9f9f9',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      flex: '1 1 250px',
    },
    task: {
      background: 'white',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px',
      cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    taskHover: {
      transform: 'scale(1.02)',
    },
    kanbanInput: {
      marginBottom: '20px',
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    itemsList: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '15px',
    },
    itemCard: {
      background: '#f9f9f9',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      animation: 'bounceIn 0.5s',
    },
    popup: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: '1000',
    },
    popupButton: {
      background: 'rgba(0, 0, 0, 0.31)',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '5px',
      transition: 'background 0.3s, transform 0.2s',
    },
    popupButtonHover: {
      background: '#0056b3',
      transform: 'scale(1.05)',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: '999',
    },
    prepTaskList: {
      marginTop: '20px',
      listStyle: 'none',
      padding: 0,
    },
    prepTaskItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      background: '#f9f9f9',
      borderRadius: '4px',
      marginBottom: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'background 0.3s',
    },
    prepTaskCompleted: {
      background: '#e0e0e0',
      textDecoration: 'line-through',
      color: '#666',
    },
    checkbox: {
      marginRight: '10px',
      cursor: 'pointer',
    },
    prepInputGroup: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    syllabusCard: {
      marginTop: '20px',
      background: '#f9f9f9',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    syllabusSearch: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      color: '#333',
      transition: 'border-color 0.3s',
    },
    syllabusSearchFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    syllabusSelect: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      color: '#333',
      transition: 'border-color 0.3s',
    },
    syllabusSelectFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    syllabusList: {
      listStyle: 'none',
      padding: 0,
    },
    syllabusItem: {
      padding: '10px',
      background: 'white',
      borderRadius: '4px',
      marginBottom: '5px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    syllabusItemHover: {
      transform: 'scale(1.02)',
    },
    syllabusContent: {
      marginTop: '10px',
      padding: '10px',
      background: '#f0f0f0',
      borderRadius: '4px',
      maxHeight: '300px',
      overflowY: 'auto',
    },
    syllabusModule: {
      marginBottom: '10px',
      color: '#000',
    },
    // Responsive adjustments
    '@media (max-width: 768px)': {
      container: {
        padding: '10px',
      },
      title: {
        fontSize: '2rem',
      },
      navButton: {
        padding: '8px 16px',
        fontSize: '0.9rem',
      },
      card: {
        padding: '2px',
        maxWidth: '100%',
       
      },
      inputField: {
        fontSize: '0.9rem',
      },
      button: {
        fontSize: '0.9rem',
      },
      kanbanColumns: {
        flexDirection: 'column',
      },
      column: {
        minWidth: '100%',
      },
      popup: {
        width: '80%',
      },
      prepInputGroup: {
        flexDirection: 'column',
      },
      syllabusSearch: {
        fontSize: '0.9rem',
      },
      syllabusSelect: {
        fontSize: '0.9rem',
      },
      syllabusContent: {
        maxHeight: '250px',
      },
      syllabusCard:{
        padding: '0px',
      },
      
    },
    '@media (max-width: 480px)': {
      title: {
        fontSize: '1.5rem',
      },
      nav: {
        flexDirection: 'column',
      },
      
      navButton: {
        width: '100%',
      },
      kanbanInput: {
        flexDirection: 'column',
      },
      button: {
        width: '100%',
      },
      popup: {
        width: '90%',
      },
      prepTaskItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      syllabusSearch: {
        width: '100%',
      },
      syllabusSelect: {
        width: '100%',
        
      },
      syllabusContent: {
        padding: '3px',
        maxHeight: '150px',
      },
      syllabusCard:{
        padding: '3px',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Tools</h1>
      <div style={styles.nav}>
        {['kanban', 'cgpa', 'lostfound', 'examPrep', 'syllabus'].map((tool) => (
          <button
            key={tool}
            style={{
              ...styles.navButton,
              ...(activeTool === tool ? styles.navButtonActive : {}),
              ':hover': styles.navButtonHover,
            }}
            onClick={() => setActiveTool(tool)}
          >
            {tool === 'cgpa' ? 'CGPA Calculator' : 
             tool === 'kanban' ? 'Kanban Board' : 
             tool === 'lostfound' ? 'Lost & Found' : 
             tool === 'examPrep' ? 'Exam Prep' : 
             'Syllabus'}
          </button>
        ))}
      </div>
      <div style={styles.toolContent}>
        {activeTool === 'cgpa' && (
          <div style={styles.card}>
            <h2 style={{ fontSize: '1.8rem', color: '#000', marginBottom: '10px' }}>CGPA to Percentage Calculator</h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Convert your CGPA to percentage based on different grading systems
            </p>
            <input
              type="number"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="Enter your CGPA"
              style={styles.inputField}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
            <select
              value={gradingSystem}
              onChange={(e) => setGradingSystem(e.target.value)}
              style={styles.inputField}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            >
              <option value="JIS System">JIS Point scale</option>
              <option value="10-point">10-point scale</option>
              <option value="4-point">4-point scale</option>
              <option value="7-point">7-point scale</option>
              <option value="5-point">5-point scale</option>
            </select>
            <button
              style={styles.button}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
              onClick={calculatePercentage}
            >
              Calculate Percentage
            </button>
            {percentage && <p style={styles.result}>Percentage: {percentage}%</p>}
          </div>
        )}
        {activeTool === 'kanban' && (
  <div style={styles.card}>
    <h2 style={{ fontSize: '1.8rem', color: '#000', marginBottom: '10px' }}>Kanban Board</h2>
    <p style={{ color: '#666', marginBottom: '15px' }}>
      Track your projects and assignments
    </p>
    <div style={styles.kanbanInput}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
        style={styles.inputField}
        onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
        onBlur={(e) => (e.target.style.borderColor = '#ddd')}
      />
      <button
        style={styles.button}
        onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
        onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
        onClick={() => addTask('todo')}
      >
        Add
      </button>
    </div>
    <div style={styles.kanbanColumns}>
      {Object.entries(tasks).map(([columnId, columnTasks]) => (
        <div
          key={columnId}
          style={{
            ...styles.column,
            background:
              columnId === 'todo'
                ? '#f0f0f0' // Grey for ToDo
                : columnId === 'inProgress'
                ? '#fff3cd' // Yellow for In Progress
                : '#d4edda', // Green for Done
          }}
        >
          <h3 style={{ fontSize: '1.2rem', color: '#000', marginBottom: '10px' }}>
            {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
          </h3>
          {columnTasks.map((task) => (
            <div
              key={task.id}
              style={{
                ...styles.task,
                background:
                  columnId === 'todo'
                    ? '#e9ecef' // Grey for ToDo
                    : columnId === 'inProgress'
                    ? '#ffeeba' // Yellow for In Progress
                    : '#c3e6cb', // Green for Done
              }}
              onClick={() => handleTaskClick(task.id)}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.taskHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.task)}
            >
              {task.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)}
        {activeTool === 'lostfound' && (
          <div style={styles.card}>
            <h2 style={{ fontSize: '1.8rem', color: '#000', marginBottom: '10px' }}>Lost & Found Board</h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Report or find lost items on campus
            </p>
            <form onSubmit={handleSubmitLostFound} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Item name"
                style={styles.inputField}
                onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              />
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Description"
                style={{ ...styles.inputField, height: '100px', resize: 'vertical' }}
                onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              />
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                style={styles.inputField}
                onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
              >
                Submit
              </button>
            </form>
            <div style={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <h4 style={{ fontSize: '1.2rem', color: '#000' }}>{item.title}</h4>
                  <p style={{ color: '#666' }}>{item.description}</p>
                  <p style={{ color: '#666' }}>Type: {item.type}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTool === 'examPrep' && (
          <div style={styles.card}>
            <h2 style={{ fontSize: '1.8rem', color: '#000', marginBottom: '10px' }}>Exam Preparation Checklist</h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Track your exam preparation progress
            </p>
            <form onSubmit={addPrepTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={newPrepTask.title}
                onChange={(e) => setNewPrepTask({ ...newPrepTask, title: e.target.value })}
                placeholder="Task (e.g., Revise Chapter 1)"
                style={styles.inputField}
                onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              />
              <input
                type="date"
                value={newPrepTask.deadline}
                onChange={(e) => setNewPrepTask({ ...newPrepTask, deadline: e.target.value })}
                style={styles.inputField}
                onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              />
              <select
                value={newPrepTask.priority}
                onChange={(e) => setNewPrepTask({ ...newPrepTask, priority: e.target.value })}
                style={styles.inputField}
                onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
              >
                Add Task
              </button>
            </form>
            <ul style={styles.prepTaskList}>
              {prepTasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    ...styles.prepTaskItem,
                    ...(task.completed ? styles.prepTaskCompleted : {}),
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    style={styles.checkbox}
                  />
                  <span style={{ marginRight: '10px' }}>{task.title}</span>
                  {task.deadline && <span style={{ color: '#666', marginRight: '10px' }}>Deadline: {task.deadline}</span>}
                  <span style={{ color: task.priority === 'High' ? '#ff4444' : task.priority === 'Medium' ? '#ff8800' : '#00bb00' }}>
                    Priority: {task.priority}
                  </span>
                </li>
              ))}
            </ul>
            <p style={{ color: '#666', marginTop: '10px' }}>
              Progress: {((prepTasks.filter(t => t.completed).length / prepTasks.length) * 100 || 0).toFixed(0)}%
            </p>
          </div>
        )}
        {activeTool === 'syllabus' && (
          <div style={styles.card}>
            <h2 style={{ fontSize: '1.8rem', color: '#000', marginBottom: '10px' }}>Syllabus Checker</h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              View and search the B.Tech CSE syllabus for each semester (Theory Courses Only)
            </p>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by course title or code..."
              style={styles.syllabusSearch}
              onFocus={(e) => (e.target.style.borderColor = styles.syllabusSearchFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={styles.syllabusSelect}
              onFocus={(e) => (e.target.style.borderColor = styles.syllabusSelectFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            >
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{`Semester ${i + 1}`}</option>
              ))}
            </select>
            <div style={styles.syllabusCard}>
              <ul style={styles.syllabusList}>
                {filteredSyllabus.map((course) => (
                  <li
                    key={`${course.code}-${course.title}`}
                    style={styles.syllabusItem}
                    onClick={() => setExpandedCourse(course.code === expandedCourse ? null : course.code)}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.syllabusItemHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.syllabusItem)}
                  >
                    <h4 style={{ fontSize: '1.2rem', color: '#000', marginBottom: '5px' }}>
                      {course.title} (Code: {course.code})
                    </h4>
                    <p style={{ color: '#666', marginBottom: '5px' }}>
                      Credits: {course.credits} | {course.description}
                    </p>
                    {expandedCourse === course.code && (
                      <div style={styles.syllabusContent}>
                        {course.content.map((module, index) => (
                          <div key={index} style={styles.syllabusModule}>
                            <strong>{module.module}</strong> ({module.hours})<br />
                            {module.topics}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {filteredSyllabus.length === 0 && (
                <p style={{ color: '#666', textAlign: 'center' }}>No courses found matching your search.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedTask && (
        <>
          <div style={styles.overlay} onClick={() => setSelectedTask(null)} />
          <div style={styles.popup}>
            <h3 style={{ fontSize: '1.2rem', color: '#000', marginBottom: '10px' }}>Move Task</h3>
            <p style={{ color: '#666', marginBottom: '15px' }}>Select new status:</p>
            <button
              style={{ ...styles.popupButton, color: 'black' }}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.popupButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.popupButton)}
              onClick={() => moveTask(selectedTask, 'todo')}
            >
              Todo
            </button>
            <button
              style={{ ...styles.popupButton, color: 'orange' }}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.popupButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.popupButton)}
              onClick={() => moveTask(selectedTask, 'inProgress')}
            >
              In Progress
            </button>
            <button
              style={{ ...styles.popupButton, color: 'green' }}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.popupButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.popupButton)}
              onClick={() => moveTask(selectedTask, 'done')}
            >
              Done
            </button>
            <button
              style={{ ...styles.popupButton, background: '#ff4444', marginTop: '10px' }}
              onMouseEnter={(e) => Object.assign(e.target.style, { ...styles.popupButtonHover, background: '#cc0000' })}
              onMouseLeave={(e) => Object.assign(e.target.style, { ...styles.popupButton, background: '#ff4444' })}
              onClick={() => setSelectedTask(null)}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes bounceIn {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default StudentTools;